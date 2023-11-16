import { type UserModel } from '../model/user'

export interface LoadUserByEmailRepository {
  findByEmail: (
    email: string,
  ) => Promise<LoadUserByEmailRepository.Result | null>
}
export namespace LoadUserByEmailRepository {
  export interface Result extends UserModel {}
}
