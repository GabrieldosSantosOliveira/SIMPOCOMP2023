export class RequiredStringError extends TypeError {
  constructor(param: string) {
    super(`The ${param} should be a string`)
    this.name = 'RequiredStringError'
  }
}
