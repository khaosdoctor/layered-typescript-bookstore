import { Book, BookObject } from '../../domain'
import { DB } from '../db'

export class BookRepository {
  #DB: DB
  constructor (database: DB) {
    this.#DB = database
  }

  async listAll () {
    const books = await this.#DB.listBooks()
    return books.map(book => new Book(book))
  }

  async findById (id: string) {
    const book = await this.#DB.getBook(id)
    if (!book) return null
    return new Book(book)
  }

  async findBy (property: keyof Omit<BookObject, 'id'>, value: any) {
    const books = await this.#DB.listBooks()
    const book = books.find(book => book[property] === value)
    if (!book) return null
    return new Book(book)
  }

  async delete (id: string) {
    return this.#DB.deleteBook(id)
  }

  async save (book: Book): Promise<Book> {
    const bookObject = book.object
    if (await this.findById(book.id)) {
      const updatedBook = await this.#DB.updateBook(book.id, book.object)
      return new Book(updatedBook)
    }
    const createdBook = await this.#DB.addBook(bookObject)
    return new Book(createdBook)
  }
}
