import { AuthServiceImpl } from '@/infra/services/auth-service-impl'
import { env } from '@/main/config/env'

import { makeTokenGenerator } from '../cryptography/make-token-generator'

export const makeAuthService = () =>
  new AuthServiceImpl(makeTokenGenerator(), env.SECRET_ACCESS_TOKEN_KEY)
