import { DB } from '../data/db'
import { AuthorRepository } from '../data/repositories/AuthorRepository'
import { AuthorService } from '../services'

export const createAuthorService = (db: DB) => {
  const authorRepository = new AuthorRepository(db)
  return new AuthorService(authorRepository)
}
