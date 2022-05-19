import { NextFunction, Request, Response } from 'express'
import { BookService } from '../../../services'

export const remove = (bookService: BookService) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await bookService.delete(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
}
