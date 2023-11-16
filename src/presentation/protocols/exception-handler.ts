import { type HttpResponse } from './http/http-response'

export interface ExceptionHandler {
  execute: (error: any) => Promise<HttpResponse | null>
}
