const { WebhookClient, Payload, Image, Card, Suggestion } = require('dialogflow-fulfillment')
const { getSenderPageScopeID } = require('./facebook-helper')
const { getUserId } = require('./line-helper')

const parseToObject = (agent, singleResponse) => {
  if (singleResponse.image) agent.add(new Image(singleResponse.image.imageUri))
  if (singleResponse.text) agent.add(singleResponse.text.text)
}

const dialogflowFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response })

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

  // Facebook
  agent.senderId = getSenderPageScopeID(request)
  console.log(`senderId : ${agent.senderId}`)

  // Line
  agent.userId = getUserId(request)
  console.log(`userId : ${agent.userId}`)

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
      senderId: agent.senderId,
      userId: agent.userId
    }

    console.log(`req : ${JSON.stringify(req)}`)

    // LINE -----------

    if (req.action === 'test') {
      const card = new Card({
        title: 'Hyperledger 101',
        text: 'Saturday, July 28 at 1:00 PM Knowledge Exchange Center - kx',
        imageUrl: 'https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/34794693_10155998076087479_3811012266577362944_n.jpg?_nc_cat=0&_nc_eui2=AeFcCK9v87b5B-BbpPAhoU2Ing-_26MwYfyBPCWzHyZMNinVMMR8zYX7yEI42UAiDDPZSa_a2oBus9G59wyCsp8vU3bhCek26GKZ1ygZeIZRng&oh=a37021d18af6f714cf77b43c65324ed7&oe=5BC5D293',
        buttonText: 'See more detail',
        buttonUrl: 'https://www.facebook.com/events/616312025409172/',
        platform: 'LINE'
      })

      console.log('card --------')
      console.log(JSON.stringify(card.getV2ResponseObject_(agent.LINE)))
      console.log('-------- card')

      agent.add(card)
      agent.add(
        new Image(
          'https://scontent.fbkk2-2.fna.fbcdn.net/v/t1.0-9/34794693_10155998076087479_3811012266577362944_n.jpg?_nc_cat=0&_nc_eui2=AeFcCK9v87b5B-BbpPAhoU2Ing-_26MwYfyBPCWzHyZMNinVMMR8zYX7yEI42UAiDDPZSa_a2oBus9G59wyCsp8vU3bhCek26GKZ1ygZeIZRng&oh=a37021d18af6f714cf77b43c65324ed7&oe=5BC5D293'
        )
      )
      agent.add(new Suggestion('Join Hyperledger 101'))
      agent.add(new Suggestion('Sound boring'))
      return
    }

    // ----------- LINE

    const { callOz } = require('./facebook-helper')
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
      } else if (res.line) {
        agent.add(new Payload(agent.LINE, res.line))
      } else {
        console.log(`Unknown agent`)
      }
    })
  }

  // Run the proper handler based on the matched Dialogflow intent
  let intentMap = new Map()
  // intentMap.set('Default Welcome Intent', welcome)
  // intentMap.set('Default Fallback Intent', fallback)

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
