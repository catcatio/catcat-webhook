exports.getSenderPageScopeID = request => {
  try {
    return request.body.originalDetectIntentRequest.payload.data.sender.id
  } catch (e) {
    return null
  }
}

const FB_MSG_URL = 'https://graph.facebook.com/v2.6/me/messages'
const getFacebookMessagesURL = (pageAccessToken, baseGraphURL = FB_MSG_URL) => `${baseGraphURL}?access_token=${pageAccessToken}`
exports.getFacebookMessagesURL = getFacebookMessagesURL

exports.sendTextMessage = (pageAccessToken, recipientId, text, messagingType = 'NON_PROMOTIONAL_SUBSCRIPTION') => {
  const { postJSON } = require('@rabbotio/fetcher')

  return postJSON(getFacebookMessagesURL(pageAccessToken), {
    messaging_type: messagingType,
    recipient: {
      id: recipientId
    },
    message: {
      text
    }
  })
}

// TODO : localhost, env
const CATCAT_CHATHOOK_URL = `https://us-central1-catcatchatbot.cloudfunctions.net/oz`

exports.callOz = body => {
  const { postJSON } = require('@rabbotio/fetcher')

  return postJSON(CATCAT_CHATHOOK_URL, body)
}
