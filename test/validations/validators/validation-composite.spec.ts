import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredEmailError } from '@/presentation/errors/required-email-error'
import { RequiredStringError } from '@/presentation/errors/required-string-error'
import { EmailValidatorMock } from '@/test/infra/mocks/validators/email-validator-mock'
import { EmailValidation } from '@/validations/validators/email-validation'
import { RequiredFieldValidation } from '@/validations/validators/required-field-validation'
import { StringValidation } from '@/validations/validators/string-validation'
import { ValidationComposite } from '@/validations/validators/validation-composite'
const field = 'any_field'

describe('ValidationComposite', () => {
  it('should return Error if the field is not provided', async () => {
    const sut = new ValidationComposite([new RequiredFieldValidation(field)])
    const result = await sut.validate({})
    expect(result).toEqual(new MissingParamError(field))
  })
  it('should return Error if the field is not a string', async () => {
    const sut = new ValidationComposite([
      new RequiredFieldValidation(field),
      new StringValidation(field),
    ])
    const result = await sut.validate({ [field]: 2 })
    expect(result).toEqual(new RequiredStringError(field))
  })
  it('should return Error if the field is not a email', async () => {
    const emailValidatorMock = new EmailValidatorMock()
    emailValidatorMock.responseIsValid = false
    const sut = new ValidationComposite([
      new RequiredFieldValidation(field),
      new EmailValidation(field, emailValidatorMock),
    ])
    const result = await sut.validate({ [field]: 2 })
    expect(result).toEqual(new RequiredEmailError(field))
  })
  it('should return null if the field is optional', async () => {
    const emailValidatorMock = new EmailValidatorMock()
    emailValidatorMock.responseIsValid = false
    const sut = new ValidationComposite([
      new StringValidation(field),
      new EmailValidation(field, emailValidatorMock),
    ])
    const result = await sut.validate({})
    expect(result).toEqual(null)
  })
})
