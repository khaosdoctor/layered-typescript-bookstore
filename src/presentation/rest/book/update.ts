import { NextFunction, Request, Response } from 'express'
import { BookService } from '../../../services'
import { z, ZodError } from 'zod'

export const update = (bookService: BookService) => async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    title: z.string().optional(),
    authors: z.string().array().optional(),
    birthday: z.date().optional(),
    description: z.string().max(300).optional(),
    pages: z.number().optional(),
    isbn: z.string().optional()
  })
  try {
    const { id } = req.params
    const bookObject = await schema.parseAsync(req.body)
    const updatedBook = await bookService.update(id, bookObject)
    res.status(200).json(updatedBook)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: error.message
      }).end()
    }
    next(error)
  }
}
