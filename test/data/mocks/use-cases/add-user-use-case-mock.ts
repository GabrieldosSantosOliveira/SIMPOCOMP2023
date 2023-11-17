import { type AddUserUseCase } from '@/domain/use-cases/add-user'

export class AddUserUseCaseMock implements AddUserUseCase {
  public user: AddUserUseCase.Params
  public responseAddUserUseCase = { accessToken: 'any_access_token' }
  async execute(user: AddUserUseCase.Params): Promise<AddUserUseCase.Result> {
    this.user = user
    return this.responseAddUserUseCase
  }
}
