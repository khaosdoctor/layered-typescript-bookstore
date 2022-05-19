import { DB } from './data/db'
import { createAuthorService, createBookService } from './factories'
import { start } from './presentation'
import { AuthorService, BookService } from './services'

export interface Config {
  port: number
  services: {
    AuthorService: AuthorService
    BookService: BookService
  }
}

(async () => {
  const db = new DB
  await db.init()

  const config: Config = {
    port: Number(process.env.PORT) || 3000,
    services: {
      AuthorService: createAuthorService(db),
      BookService: createBookService(db)
    }
  }

  start(config)
})()
