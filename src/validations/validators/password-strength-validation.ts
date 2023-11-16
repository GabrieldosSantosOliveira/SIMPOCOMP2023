import { PasswordStrengthError } from '@/presentation/errors/password-strength-error'
import { type Validation } from '@/presentation/protocols/validation'

export class PasswordStrengthValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  async validate(input: any): Promise<Error | null> {
    const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)[\d\w\W]{8,255}$/

    if (input[this.fieldName]) {
      const isValid = regexpPassword.test(input[this.fieldName])
      if (isValid) {
        return null
      }
      return new PasswordStrengthError(this.fieldName)
    }
    return null
  }
}
