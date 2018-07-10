const { dialogflowFulfillment } = require('./lib/webhook')

const start = async () => {
  // Express
  const app = await require('./lib/express').init()

  // Webhook
  app.post('/webhook', dialogflowFulfillment)

  // Listen
  app.listen(app.get('port'), err => {
    if (err) throw err
    console.log('CatCat :', app.get('port')) // eslint-disable-line
  })

  return app
}

exports.start = start

start()
