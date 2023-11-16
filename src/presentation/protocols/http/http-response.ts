export interface HttpResponse<B = any> {
  body: B
  statusCode: number
}
