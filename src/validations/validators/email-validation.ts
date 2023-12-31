import { RequiredEmailError } from '@/presentation/errors/required-email-error'
import { type Validation } from '@/presentation/protocols/validation'

import { type EmailValidator } from '../protocols/email-validator'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  async validate(input: any): Promise<Error | null> {
    if (input[this.fieldName]) {
      const isValid = await this.emailValidator.isValid(input[this.fieldName])
      if (isValid) {
        return null
      }
      return new RequiredEmailError(this.fieldName)
    }
    return null
  }
}
