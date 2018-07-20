exports.getSenderPageScopeID = request => {
  try {
    return request.body.originalDetectIntentRequest.payload.data.sender.id
  } catch (e) {
    return null
  }
}
