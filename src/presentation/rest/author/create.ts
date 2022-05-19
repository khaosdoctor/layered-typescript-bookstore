import { NextFunction, Request, Response } from 'express'
import { AuthorService } from '../../../services'
import { z, ZodError } from 'zod'

export const create = (authorService: AuthorService) => async (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    birthday: z.date(),
    bio: z.string().max(300)
  })

  try {
    const authorObject = await schema.parseAsync(req.body)
    const createdAuthor = await authorService.create({ ...authorObject, id: '' })
    return res.status(201).json(createdAuthor.object)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(422).json({
        message: error.message
      }).end()
    }
    next(error)
  }
}
