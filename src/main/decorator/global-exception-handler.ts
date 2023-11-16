import { serverError } from '@/presentation/helpers/http-helpers'
import { type Controller } from '@/presentation/protocols/controller'
import { type ExceptionHandler } from '@/presentation/protocols/exception-handler'
import { type HttpRequest } from '@/presentation/protocols/http/http-request'
import { type HttpResponse } from '@/presentation/protocols/http/http-response'

export class GlobalExceptionHandler implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly exceptionHandlers: ExceptionHandler[],
  ) {}

  async execute(
    request: HttpRequest<any, any, any>,
  ): Promise<HttpResponse<any>> {
    try {
      return await this.controller.execute(request)
    } catch (error) {
      for (const exceptionHandler of this.exceptionHandlers) {
        const isException = await exceptionHandler.execute(error)
        if (isException) {
          return isException
        }
      }
      console.log(error)
      return serverError()
    }
  }
}
