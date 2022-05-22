import { constants } from 'node:fs'
import { access, readFile, writeFile } from 'node:fs/promises'
import path from 'path'
import { AuthorObject, BookObject } from '../domain'

export class DB {

  // eslint-disable-next-line no-use-before-define
  static instance: DB
  #authors: Map<string, AuthorObject> = new Map()
  #books: Map<string, BookObject> = new Map()
  #dbPath = path.resolve(__dirname, '.db.json')

  constructor () {
    if (!DB.instance) DB.instance = this
    return DB.instance
  }

  async save () {
    return writeFile(this.#dbPath, JSON.stringify({
      authors: [...this.#authors.entries()],
      books: [...this.#books.entries()]
    }))
  }

  async #load () {
    const readData = await readFile(this.#dbPath, 'utf8')
    this.#authors = new Map(Array.isArray(JSON.parse(readData).authors) ? JSON.parse(readData).authors : new Map())
    this.#books = new Map(Array.isArray(JSON.parse(readData).books) ? JSON.parse(readData).books : new Map())
  }

  async init () {
    try {
      await access(this.#dbPath, constants.F_OK)
      await this.#load()
    } catch (error) {
      await this.save()
    }
  }

  async addBook (book: BookObject) {
    this.#books.set(book.id, book)
    await this.save()
    return book
  }

  async updateBook (bookId: string, updateData: Partial<BookObject>) {
    const currentBook = await this.#books.get(bookId) || {}
    delete updateData.id
    const newBook = { ...currentBook, ...updateData } as BookObject
    this.#books.set(bookId, newBook)
    await this.save()
    return newBook
  }

  async deleteBook (id: string) {
    this.#books.delete(id)
    await this.save()
  }

  async getBook (id: string) {
    return this.#books.get(id)
  }

  async listBooks () {
    return [...this.#books.values()]
  }

  // --------------

  async addAuthor (author: AuthorObject) {
    this.#authors.set(author.id, author)
    await this.save()
    return author
  }

  async updateAuthor (authorId: string, updateData: Partial<AuthorObject>) {
    const currentAuthor = await this.#authors.get(authorId) || {}
    delete updateData.id
    const newAuthor = { ...currentAuthor, ...updateData } as AuthorObject
    this.#authors.set(authorId, newAuthor)
    await this.save()
    return newAuthor
  }

  async deleteAuthor (id: string) {
    this.#authors.delete(id)
    await this.save()
  }

  async listAuthors () {
    return [...this.#authors.values()]
  }

  async getAuthor (id: string) {
    return this.#authors.get(id)
  }
}
