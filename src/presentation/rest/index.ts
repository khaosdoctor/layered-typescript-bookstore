import express from 'express'
import { Config } from '../..'
import { authorRoutesFactory } from './author'
import { bookRoutesFactory } from './book'
import bodyParser from 'body-parser'
const app = express()
const PORT = process.env.PORT || 3000

const restLayer = (config: Config) => {
  app.use(bodyParser.json())
  app.use('/books', bookRoutesFactory(config.services))
  app.use('/authors', authorRoutesFactory(config.services))
  app.listen(config.port, () => console.log(`Listening on port ${PORT}`))
}

export { restLayer }
