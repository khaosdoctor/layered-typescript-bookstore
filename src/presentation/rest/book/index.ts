import { Router } from 'express'
import { Config } from '../../..'
import { create } from './create'
import { remove } from './delete'
import { find } from './find'
import { getAuthors } from './getAuthors'
import { list } from './list'
import { update } from './update'

export const bookRoutesFactory = (services: Config['services']) => {
  const router = Router()

  router.get('/', list(services.BookService))
  router.get('/:id', find(services.BookService))
  router.get('/:id/authors', getAuthors(services.BookService))
  router.delete('/:id', remove(services.BookService))
  router.put('/:id', update(services.BookService))
  router.post('/', create(services.BookService))

  return router
}
