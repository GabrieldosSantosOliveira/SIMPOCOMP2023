import { type UserModel } from '../model/user'

export interface AddUserRepository {
  add: (user: AddUserRepository.Params) => Promise<void>
}
export namespace AddUserRepository {
  export interface Params extends UserModel {}
}
