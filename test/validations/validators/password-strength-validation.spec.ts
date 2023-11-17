import { PasswordStrengthError } from '@/presentation/errors/password-strength-error'
import { PasswordStrengthValidation } from '@/validations/validators/password-strength-validation'

const field = 'any_field'
const makeSut = () => {
  const sut = new PasswordStrengthValidation(field)
  return { sut }
}
describe('PasswordStrengthValidation', () => {
  it('should return null if field no has value', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toBe(null)
  })
  it('should return PasswordStrengthError if field is less than 8 characters', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: '' })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field no has a upper case letter', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 'a1234567!' })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field no has a lower case letter', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 'A1234567!' })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field no has a number', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 'Any_password!' })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field no has a special character', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 'Any_password1234' })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field is greater than 255 characters', async () => {
    const { sut } = makeSut()
    const invalidPassword = 'a'.repeat(250) + 'Aa1223456!'
    const result = await sut.validate({
      [field]: invalidPassword,
    })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return PasswordStrengthError if field is not a string', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 2 })
    expect(result).toEqual(new PasswordStrengthError(field, 8, 255))
  })
  it('should return null if field is valid', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 'Ab123456!' })
    expect(result).toEqual(null)
  })
})
