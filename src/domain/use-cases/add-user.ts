import { type UserModel } from '../model/user'

export interface AddUserUseCase {
  execute: (user: AddUserUseCase.Params) => Promise<AddUserUseCase.Result>
}

export namespace AddUserUseCase {
  export interface Params
    extends Pick<UserModel, 'email' | 'firstName' | 'lastName' | 'password'> {}
  export interface Result {
    accessToken: string
  }
}
