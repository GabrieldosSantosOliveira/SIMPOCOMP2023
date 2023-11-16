import { LoadUserByEmailRepositoryImpl } from '@/infra/database/repositories/load-user-by-email-repository-impl'

export const makeLoadUserByEmailRepository = () =>
  new LoadUserByEmailRepositoryImpl()
