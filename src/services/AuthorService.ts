import { AuthorRepository } from '../data/repositories/AuthorRepository'
import { Author, AuthorObject } from '../domain'

export class AuthorService {
  #authorRepository: AuthorRepository

  constructor (authorRepository: AuthorRepository) {
    this.#authorRepository = authorRepository
  }

  async listAll () {
    return this.#authorRepository.listAll()
  }

  async findById (id: string) {
    const author = await this.#authorRepository.findById(id)
    if (!author) throw new Error('Author not found')
    return author
  }

  async create (authorObject: AuthorObject) {
    const author = new Author(authorObject)
    const existingAuthor = await this.#authorRepository.findBy('email', author.email)
    if (existingAuthor) throw new Error('Author already exists')
    return this.#authorRepository.save(author)
  }

  async update (searchId: string, updateValues: Partial<AuthorObject>) {
    const existingAuthor = await this.findById(searchId)
    delete updateValues.id
    const author = new Author({ ...existingAuthor.object, ...updateValues })
    return this.#authorRepository.save(author)
  }

  async delete (id: string) {
    await this.#authorRepository.delete(id)
  }
}
