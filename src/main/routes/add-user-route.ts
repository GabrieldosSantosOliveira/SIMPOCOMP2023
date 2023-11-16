import { type Router } from 'express'

import { expressAdapter } from '../adapters/express-adapter'
import { makeGlobalExceptionHandler } from '../factories/decorator/make-global-exception-handler'
import { makeAddUserController } from '../factories/presentation/controllers/make-add-user-controller'

export default function (router: Router) {
  router.post(
    '/user',
    expressAdapter(makeGlobalExceptionHandler(makeAddUserController())),
  )
}
