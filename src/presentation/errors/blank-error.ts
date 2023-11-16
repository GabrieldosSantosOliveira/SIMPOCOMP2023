export class BlankError extends Error {
  constructor(param: string) {
    super(`Should not be blank: ${param}`)
    this.name = 'BlankError'
  }
}
