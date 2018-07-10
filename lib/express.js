exports.init = async () => {
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const logger = require('morgan')
  const express = require('express')
  // const path = require('path')

  const app = express()
  app.set('port', process.env.PORT || 9090)
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  /* ----------  Static Assets  ---------- */

  // app.use('/', express.static(path.join(__dirname, 'public')))

  /* ----------  Parsers  ---------- */

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  /* ----------  Loggers &c  ---------- */

  app.use(logger('dev'))

  return app
}
