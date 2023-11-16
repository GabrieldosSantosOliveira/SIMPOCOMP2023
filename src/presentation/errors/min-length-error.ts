export class MinLengthError extends Error {
  constructor(param: string, minLength: number) {
    super(`The ${param} must be ${minLength} characters long`)
    this.name = 'MinLengthError'
  }
}
