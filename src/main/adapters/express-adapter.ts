import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest } from '@/presentation/protocols/http/http-request'
import { type Request, type Response } from 'express'
export const expressAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
    }
    const httpResponse = await controller.execute(httpRequest)
    return response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
