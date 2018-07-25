const { WebhookClient, Payload, Image } = require('dialogflow-fulfillment')
const { getSenderPageScopeID } = require('./facebook/helper')

const parseToObject = (agent, singleResponse) => {
  if (singleResponse.image) agent.add(new Image(singleResponse.image.imageUri))
  if (singleResponse.text) agent.add(singleResponse.text.text)
}

const dialogflowFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response })

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

  agent.senderId = getSenderPageScopeID(request)

  console.log(`senderId : ${agent.senderId}`)

  function welcome (agent) {
    agent.add(`Welcome!`)
  }

  function fallback (agent) {
    agent.add(`I didn't understand`)
    agent.add(`I'm sorry, can you try again?`)
  }

  async function other (agent) {
    const req = {
      requestSource: agent.requestSource,
      locale: agent.locale,
      action: agent.action,
      session: agent.session,
      parameters: agent.parameters,
      senderId: agent.senderId
    }

    console.log(`req : ${JSON.stringify(req)}`)

    // Ask for user profile
    if (agent.senderId === '2238896416126713') {
      // URL Button https://developers.facebook.com/docs/messenger-platform/send-messages/buttons#url
      agent.add(
        new Payload(agent.FACEBOOK, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'Try the URL button!',
              buttons: [
                {
                  type: 'web_url',
                  url: 'https://catcat.io/fb_ask_permission.html',
                  title: 'URL Button',
                  webview_height_ratio: 'full',
                  messenger_extensions: true
                }
              ]
            }
          }
        })
      )
      return true
    }

    const { callOz } = require('./facebook/helper')
    return callOz(req).then(res => {
      console.log(`Response : ${JSON.stringify(res)}`)

      if (res.dialogflow) {
        // Why we need to parse this?
        if (res.dialogflow instanceof Array) {
          res.dialogflow.forEach(singleResponse => parseToObject(agent, singleResponse))
        } else {
          parseToObject(agent, res.dialogflow)
        }
      } else if (res.facebook) {
        agent.add(new Payload(agent.FACEBOOK, res.facebook))
      } else {
        console.log(`Unknown agent`)
      }
    })
  }

  // Run the proper handler based on the matched Dialogflow intent
  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback)

  /* TODO : support ACTIONS_ON_GOOGLE
  if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
    intentMap.set(null, googleAssistantOther)
  } else {
    intentMap.set(null, other)
  }
  */

  intentMap.set(null, other)

  agent.handleRequest(intentMap)
}

exports.dialogflowFulfillment = dialogflowFulfillment
