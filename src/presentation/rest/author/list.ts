import { Request, Response } from 'express'
import { AuthorService } from '../../../services'

export const list = (authorService: AuthorService) => async (req: Request, res: Response) => {
  const authors = await authorService.listAll()
  res.status(200).json(authors)
}
