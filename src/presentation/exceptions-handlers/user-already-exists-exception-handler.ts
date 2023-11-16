import { UserAlreadyExistsException } from '@/domain/errors/user-already-exists-exception'

import { conflict } from '../helpers/http-helpers'
import { type ExceptionHandler } from '../protocols/exception-handler'
import { type HttpResponse } from '../protocols/http/http-response'

export class UserAlreadyExistsExceptionHandler implements ExceptionHandler {
  async execute(error: any): Promise<HttpResponse<any> | null> {
    if (error instanceof UserAlreadyExistsException) {
      return conflict({
        message: error.message,
      })
    }
    return null
  }
}
