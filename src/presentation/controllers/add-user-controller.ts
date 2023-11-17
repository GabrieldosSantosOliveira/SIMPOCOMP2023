import { type AddUserUseCase } from '@/domain/use-cases/add-user'

import { badRequest, created } from '../helpers/http-helpers'
import { type Controller } from '../protocols/controller'
import { type HttpRequest } from '../protocols/http/http-request'
import { type HttpResponse } from '../protocols/http/http-response'
import { type Validation } from '../protocols/validation'
export interface AddUserControllerRequestBody {
  email: string
  firstName: string
  lastName: string
  password: string
}
export class AddUserController implements Controller {
  constructor(
    private readonly validationBody: Validation,
    private readonly addUserUseCase: AddUserUseCase,
  ) {}

  async execute(
    request: HttpRequest<AddUserControllerRequestBody, any, any>,
  ): Promise<HttpResponse<any>> {
    const isInvalidBody = await this.validationBody.validate(request.body)
    if (isInvalidBody) {
      return badRequest({ message: isInvalidBody.message })
    }
    const user = request.body
    const { accessToken } = await this.addUserUseCase.execute({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
    })
    return created({ accessToken })
  }
}
