import { NextFunction, Request, Response } from 'express'
import { AuthorService } from '../../../services'
import { z, ZodError } from 'zod'

export const update = (authorService: AuthorService) => async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    birthday: z.date().optional(),
    bio: z.string().max(300).optional()
  })
  try {
    const { id } = req.params
    const authorObject = await schema.parseAsync(req.body)
    const updatedAuthor = await authorService.update(id, authorObject)
    res.status(200).json(updatedAuthor)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: error.message
      }).end()
    }
    next(error)
  }
}
