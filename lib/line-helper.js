exports.getUserId = request => {
  try {
    return request.body.originalDetectIntentRequest.payload.data.source.userId
  } catch (e) {
    return null
  }
}
