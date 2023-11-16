export class RequiredEmailError extends TypeError {
  constructor(param: string) {
    super(`The ${param} should be a valid email`)
    this.name = 'RequiredEmailError'
  }
}
