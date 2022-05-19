import { BookRepository } from '../data/repositories/BookRepository'
import { Author, Book, BookObject } from '../domain'
import { AuthorService } from './AuthorService'

export class BookService {
  #bookRepository: BookRepository
  #authorService: AuthorService

  constructor (bookRepository: BookRepository, authorService: AuthorService) {
    this.#bookRepository = bookRepository
    this.#authorService = authorService
  }

  async listAll () {
    return this.#bookRepository.listAll()
  }

  async findById (id: string) {
    const book = await this.#bookRepository.findById(id)
    if (!book) throw new Error('Book not found')
    return book
  }

  async getAuthors (book: Book) {
    const authors: Author[] = []
    for (const authorId of book.authors) {
      try {
        const author = await this.#authorService.findById(authorId)
        authors.push(author)
      } catch (err) {
        console.warn(`Author ${authorId} not found for book ${book.id}`)
        continue
      }
    }

    return authors
  }

  async create (bookObject: BookObject) {
    const book = new Book(bookObject)
    const existingBook = await this.#bookRepository.findBy('isbn', book.isbn)
    if (existingBook) throw new Error('Book already exists')
    return this.#bookRepository.save(book)
  }

  async update (searchId: string, updateValues: Partial<BookObject>) {
    const existingBook = await this.findById(searchId)
    delete updateValues.id
    const book = new Book({ ...existingBook.object, ...updateValues })
    return this.#bookRepository.save(book)
  }

  async delete (id: string) {
    await this.#bookRepository.delete(id)
  }
}
