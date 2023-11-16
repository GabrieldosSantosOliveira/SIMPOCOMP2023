import { AddUserController } from '@/presentation/controllers/add-user-controller'

import { makeAddUserUseCase } from '../../data/use-cases/make-add-user-use-case'
import { makeAddUserValidation } from './make-add-user-validation'

export const makeAddUserController = () =>
  new AddUserController(makeAddUserValidation(), makeAddUserUseCase())
