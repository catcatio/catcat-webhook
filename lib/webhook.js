const { WebhookClient, Text, Card, Suggestion, Payload } = require('dialogflow-fulfillment')

// const { Carousel } = require('actions-on-google')

const dialogflowFulfillment = (request, response) => {
  const agent = new WebhookClient({ request, response })
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

  function googleAssistantOther (agent) {
    // Get Actions on Google library conv instance
    let conv = agent.conv()
    // Use Actions on Google library to add responses
    conv.ask('Please choose an item:')
    conv.ask(
      new Carousel({
        title: 'Google Assistant',
        items: {
          WorksWithGoogleAssistantItemKey: {
            title: 'Works With the Google Assistant',
            description: 'If you see this logo, you know it will work with the Google Assistant.',
            image: {
              url: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
              accessibilityText: 'Works With the Google Assistant logo'
            }
          },
          GoogleHomeItemKey: {
            title: 'Google Home',
            description: 'Google Home is a powerful speaker and voice Assistant.',
            image: {
              url: 'https://lh3.googleusercontent.com/Nu3a6F80WfixUqf_ec_vgXy_c0-0r4VLJRXjVFF_X_CIilEu8B9fT35qyTEj_PEsKw',
              accessibilityText: 'Google Home'
            }
          }
        }
      })
    )
    // Add Actions on Google library responses to your agent's response
    agent.add(conv)
  }

  function welcome (agent) {
    agent.add(`Welcome to my agent!`)
  }

  function fallback (agent) {
    agent.add(`I didn't understand`)
    agent.add(`I'm sorry, can you try again?`)
  }

  function _other (agent) {
    agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`)
    agent.add(
      new Card({
        title: `Title: this is a card title`,
        imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
        buttonText: 'This is a button',
        buttonUrl: 'https://assistant.google.com/'
      })
    )
    agent.add(new Suggestion(`Quick Reply`))
    agent.add(new Suggestion(`Suggestion`))
    agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' } })
  }

  function other (agent) {
    const facebookPayload = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Title: this is a title',
              image_url: `https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png`,
              subtitle: 'This is a subtitle',
              default_action: {
                type: 'web_url',
                url: 'https://assistant.google.com/'
              },
              buttons: [
                {
                  type: 'web_url',
                  url: 'https://assistant.google.com/',
                  title: 'This is a button'
                }
              ]
            }
          ]
        }
      }
    }

    agent.add(new Text('Hello World'))
    agent.add(new Payload(agent.FACEBOOK, facebookPayload))
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
