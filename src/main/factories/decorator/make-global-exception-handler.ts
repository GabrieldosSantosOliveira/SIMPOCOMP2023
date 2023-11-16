import { GlobalExceptionHandler } from '@/main/decorator/global-exception-handler'
import { UserAlreadyExistsExceptionHandler } from '@/presentation/exceptions-handlers/user-already-exists-exception-handler'
import { type Controller } from '@/presentation/protocols/controller'

export const makeGlobalExceptionHandler = (controller: Controller) =>
  new GlobalExceptionHandler(controller, [
    new UserAlreadyExistsExceptionHandler(),
  ])
