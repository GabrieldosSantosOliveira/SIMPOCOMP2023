import { PasswordStrengthError } from '@/presentation/errors/password-strength-error'
import { type Validation } from '@/presentation/protocols/validation'

export class PasswordStrengthValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  private readonly MIN_LENGTH_PASSWORD = 8
  private readonly MAX_LENGTH_PASSWORD = 255
  async validate(input: any): Promise<Error | null> {
    const regexpPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,255}).*$/

    if (input[this.fieldName] || input[this.fieldName] === '') {
      if (
        typeof input[this.fieldName] === 'string' &&
        input[this.fieldName].length > this.MAX_LENGTH_PASSWORD
      ) {
        return new PasswordStrengthError(
          this.fieldName,
          this.MIN_LENGTH_PASSWORD,
          this.MAX_LENGTH_PASSWORD,
        )
      }
      const isValid = regexpPassword.test(input[this.fieldName])
      if (isValid) {
        return null
      }

      return new PasswordStrengthError(
        this.fieldName,
        this.MIN_LENGTH_PASSWORD,
        this.MAX_LENGTH_PASSWORD,
      )
    }
    return null
  }
}
