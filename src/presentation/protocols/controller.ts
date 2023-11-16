import { type HttpRequest } from './http/http-request'
import { type HttpResponse } from './http/http-response'

export interface Controller {
  execute: (request: HttpRequest) => Promise<HttpResponse>
}
