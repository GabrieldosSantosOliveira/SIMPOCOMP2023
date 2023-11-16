import { AddUserRepositoryImpl } from '@/infra/database/repositories/add-user-repository-impl'

export const makeAddUserRepository = () => new AddUserRepositoryImpl()
