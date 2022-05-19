import { v4 as uuid } from 'uuid'

export interface BookObject {
  id: string
  title: string
  authors: string[]
  description: string
  pages: number
  isbn: string
}

export class Book {
  id: string
  title: string
  authors: string[]
  description: string
  pages: number
  isbn: string

  constructor (properties: BookObject) {
    this.id = properties.id || uuid()
    this.title = properties.title
    this.authors = properties.authors
    this.description = properties.description
    this.pages = properties.pages
    this.isbn = properties.isbn
  }

  get object (): BookObject {
    return {
      id: this.id,
      title: this.title,
      authors: this.authors,
      description: this.description,
      pages: this.pages,
      isbn: this.isbn
    }
  }
}
