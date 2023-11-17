export class PasswordStrengthError extends Error {
  constructor(param: string, minLength: number, maxLength: number) {
    super(
      `The ${param} must have at least ${minLength} letters, a lowercase and uppercase letter, a number and a special character and max ${maxLength}`,
    )
    this.name = 'PasswordStrengthError'
  }
}
