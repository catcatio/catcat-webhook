const { WebhookClient, Payload, Image } = require('dialogflow-fulfillment')
const { getSenderPageScopeID } = require('./facebook/helper')

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

    const { callOz } = require('./facebook/helper')
    return callOz(req).then(res => {
      console.log(res)
      if (req.action === 'events.tickets.book-yes') {
        agent.add(
          new Image(
            'https://firebasestorage.googleapis.com/v0/b/catcatchatbot.appspot.com/o/0b0a69b119e86bb5c66bd1e3e72f853062bec514375c4ad25187a945891fa18b.png?alt=media&token=69e49c03-1d9b-4749-a529-2d3ac6b900e3'
          )
        )
      } else agent.add(new Payload(agent.FACEBOOK, res))
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
