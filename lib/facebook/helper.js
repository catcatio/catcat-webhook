exports.getSenderPageScopeID = request => {
  try {
    return request.body.originalDetectIntentRequest.payload.data.sender.id
  } catch (e) {
    return null
  }
}

exports.sendTextMessage = (pageAccessToken, recipientId, text, messagingType = 'NON_PROMOTIONAL_SUBSCRIPTION') => {
  const { postJSON } = require('@rabbotio/fetcher')
  const URI = `https://graph.facebook.com/v2.6/me/messages`
  const ENDPOINT_URL = `${URI}?access_token=${pageAccessToken}`

  return postJSON(ENDPOINT_URL, {
    messaging_type: messagingType,
    recipient: {
      id: recipientId
    },
    message: {
      text
    }
  })
}
