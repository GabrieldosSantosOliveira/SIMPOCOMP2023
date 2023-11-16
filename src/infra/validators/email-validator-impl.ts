import { type EmailValidator } from '@/validations/protocols/email-validator'
import validator from 'validator'
export class EmailValidatorImpl implements EmailValidator {
  async isValid(email: string): Promise<boolean> {
    return validator.isEmail(email)
  }
}
