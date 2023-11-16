import { type HttpResponse } from '../protocols/http/http-response'
import { HttpStatus } from './http-status'

export const ok = (body: any): HttpResponse => {
  return {
    body,
    statusCode: HttpStatus.OK,
  }
}
export const badRequest = (body: any): HttpResponse => {
  return {
    body,
    statusCode: HttpStatus.BAD_REQUEST,
  }
}
export const serverError = (body: any): HttpResponse => {
  return {
    body,
    statusCode: HttpStatus.SERVER_ERROR,
  }
}
export const noContent = (): HttpResponse => {
  return {
    body: null,
    statusCode: HttpStatus.NO_CONTENT,
  }
}
