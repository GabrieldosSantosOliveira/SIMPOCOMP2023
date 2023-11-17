import { RequiredEmailError } from '@/presentation/errors/required-email-error'
import { type EmailValidator } from '@/validations/protocols/email-validator'
import { EmailValidation } from '@/validations/validators/email-validation'

const makeSut = () => {
  const emailValidatorSpy: EmailValidator = {
    async isValid() {
      return true
    },
  }
  const sut = new EmailValidation('email', emailValidatorSpy)
  return { sut, emailValidatorSpy }
}
describe('EmailValidation', () => {
  it('should return null if no has email', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toBe(null)
  })
  it('should return null if a valid email is provided', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ email: 'any_email' })
    expect(result).toBe(null)
  })
  it('should return RequiredEmailError if a invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isValid = async () => false
    const result = await sut.validate({ email: 'any_email' })
    expect(result).toEqual(new RequiredEmailError('email'))
  })
})
