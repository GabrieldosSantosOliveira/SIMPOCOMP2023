import { type Validation } from '@/presentation/protocols/validation'
import { EmailValidation } from '@/validations/validators/email-validation'
import { MinLengthValidation } from '@/validations/validators/min-length-validation'
import { NotBlankValidation } from '@/validations/validators/not-blank-validation'
import { PasswordStrengthValidation } from '@/validations/validators/password-strength-validation'
import { StringValidation } from '@/validations/validators/string-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite'

import { makeEmailValidator } from '../../infra/validators/make-email-validator'

export const makeAddUserValidation = () => {
  const validations: Validation[] = []

  for (const field of ['email', 'password', 'firstName', 'lastName']) {
    validations.push(new NotBlankValidation(field))
    validations.push(new StringValidation(field))
  }
  validations.push(new EmailValidation('email', makeEmailValidator()))
  validations.push(new PasswordStrengthValidation('password'))
  validations.push(new MinLengthValidation('password', 8))
  return new ValidationComposite(validations)
}
