export interface HttpRequest<B = any, Q = any, P = any> {
  body: B
  query: Q
  params: P
}
