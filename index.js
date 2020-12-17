import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import morgan from 'morgan'
import methodOverride from 'method-override'
import helmet from 'helmet'
import cors from 'cors'

import routes from './src/routes'
import { converter, handler, notFound } from './src/middlewares/error'
import logger from './src/config/logger'
import { env, morganLogFormat, port } from './src/config/environment'
import mongooseConnect from './src/config/mongoose'

const app = express()

// request logging. dev: console | production: file
app.use(morgan(morganLogFormat))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount api routes
app.use(routes)

// if error is not an instanceOf API convert it.
app.use(converter)

// catch 404 and forward to error handler
app.use(notFound)

// error handler, send stacktrace only during development
app.use(handler)

// open mongoose connection
mongooseConnect()

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`))
