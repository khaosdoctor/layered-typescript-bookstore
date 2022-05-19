import { Config } from '..'
import { restLayer } from './rest'

const start = (config: Config) => {
  restLayer(config)
}

export { start }
