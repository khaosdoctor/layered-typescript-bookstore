import { Router } from 'express'
import { Config } from '../../..'
import { create } from './create'
import { remove } from './delete'
import { find } from './find'
import { list } from './list'
import { update } from './update'

export const authorRoutesFactory = (services: Config['services']) => {
  const router = Router()

  router.get('/', list(services.AuthorService))
  router.get('/:id', find(services.AuthorService))
  router.delete('/:id', remove(services.AuthorService))
  router.put('/:id', update(services.AuthorService))
  router.post('/', create(services.AuthorService))

  return router
}
