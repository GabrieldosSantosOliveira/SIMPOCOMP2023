import { AddUserUseCaseImpl } from '@/data/use-cases/add-user-use-case-impl'

import { makeBcrypt } from '../../infra/cryptography/make-bcrypt'
import { makeAddUserRepository } from '../../infra/database/repositories/make-add-user-repository'
import { makeLoadUserByEmailRepository } from '../../infra/database/repositories/make-load-user-by-email-repository'
import { makeAuthService } from '../../infra/services/make-auth-service'
import { makeGeneratorUUID } from '../../infra/uuid/make-generator-uuid'

export const makeAddUserUseCase = () => {
  return new AddUserUseCaseImpl(
    makeLoadUserByEmailRepository(),
    makeAddUserRepository(),
    makeAuthService(),
    makeBcrypt(),
    makeGeneratorUUID(),
  )
}
