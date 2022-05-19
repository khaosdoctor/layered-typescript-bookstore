import { Request, Response } from 'express'
import { AuthorService } from '../../../services'

export const list = (authorService: AuthorService) => async (_: Request, res: Response) => {
  const authors = await authorService.listAll()
  res.status(200).json(authors)
}
