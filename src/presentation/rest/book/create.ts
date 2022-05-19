import { NextFunction, Request, Response } from 'express'
import { BookService } from '../../../services'
import { z, ZodError } from 'zod'

export const create = (bookService: BookService) => async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    title: z.string(),
    authors: z.string().array(),
    birthday: z.date(),
    description: z.string().max(300),
    pages: z.number(),
    isbn: z.string()
  })
  try {
    const bookObject = await schema.parseAsync(req.body)
    const newBook = await bookService.create({ ...bookObject, id: '' })
    res.status(201).json(newBook)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: error.message
      }).end()
    }
    next(error)
  }
}
