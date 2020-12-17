import { config } from 'dotenv'

config()

export const env = process.env.NODE_ENV
export const port = process.env.PORT
export const mongo = {
  uri: process.env.MONGO_URI,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}
export const morganLogFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
