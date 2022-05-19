import { Request, Response } from 'express'
import { BookService } from '../../../services'

export const find = (bookService: BookService) => async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const book = await bookService.findById(id)
    return res.status(200).json(book.object)
  } catch (error) {
    res
      .status(404)
      .json({ message: (error as Error).message })
  }
}
