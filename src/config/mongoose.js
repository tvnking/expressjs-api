import mongoose from 'mongoose'
import logger from './logger'
import { mongo, env } from './environment'

// Exit application on error
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true)
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
const mongooseConnect = () => {
  mongoose
    .connect(mongo.uri, {
      useCreateIndex: true,
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    // eslint-disable-next-line no-console
    .then(() => logger.info('MongoDB connected successfully'))

  return mongoose.connection
}

export default mongooseConnect
