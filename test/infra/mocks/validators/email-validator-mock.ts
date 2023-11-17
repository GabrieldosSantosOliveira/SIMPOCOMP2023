import { type EmailValidator } from '@/validations/protocols/email-validator'

export class EmailValidatorMock implements EmailValidator {
  public responseIsValid = true
  async isValid(email: string): Promise<boolean> {
    return this.responseIsValid
  }
}
