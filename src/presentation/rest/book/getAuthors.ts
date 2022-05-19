import { NextFunction, Request, Response } from 'express'
import { BookService } from '../../../services'

export const getAuthors = (bookService: BookService) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const book = await bookService.findById(id)
    const authors = await bookService.getAuthors(book)
    res.json({ ...book.object, authors })
  } catch (error) {
    next(error)
  }
}
