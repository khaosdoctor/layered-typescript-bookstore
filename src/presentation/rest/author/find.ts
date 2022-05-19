import { Request, Response } from 'express'
import { AuthorService } from '../../../services'

export const find = (authorService: AuthorService) => async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const author = await authorService.findById(id)
    return res.status(200).json(author.object)
  } catch (error) {
    res
      .status(404)
      .json({ message: (error as Error).message })
  }
}
