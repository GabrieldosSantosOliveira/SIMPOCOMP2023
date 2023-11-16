export class PasswordStrengthError extends Error {
  constructor(param: string) {
    super(
      `The ${param} must have at least 8 letters, a lowercase and uppercase letter, a number and a special character`,
    )
    this.name = 'PasswordStrengthError'
  }
}
