const { WebhookClient, Payload } = require('dialogflow-fulfillment')
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

  function other (agent) {
    // Request
    const req = {
      requestSource: agent.requestSource,
      locale: agent.locale,
      action: agent.action,
      session: agent.session,
      parameters: agent.parameters,
      senderId: agent.senderId
    }

    console.log(`req : ${JSON.stringify(req)}`)

    const facebook = require('./facebook/carousel')(req)

    agent.add(new Payload(agent.FACEBOOK, facebook))
  }

  // Run the proper handler based on the matched Dialogflow intent
  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Default Fallback Intent', fallback)

  if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
    intentMap.set(null, googleAssistantOther)
  } else {
    intentMap.set(null, other)
  }

  agent.handleRequest(intentMap)
}

exports.dialogflowFulfillment = dialogflowFulfillment
