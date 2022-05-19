import { NextFunction, Request, Response } from 'express'
import { AuthorService } from '../../../services'

export const remove = (authorService: AuthorService) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    await authorService.delete(id)
    return res.status(204).end()
  } catch (error) {
    next(error)
  }
}
