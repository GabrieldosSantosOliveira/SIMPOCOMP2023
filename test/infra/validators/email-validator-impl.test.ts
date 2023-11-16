import { EmailValidatorImpl } from '@/infra/validators/email-validator-impl'
import { faker } from '@faker-js/faker'
import validator from 'validator'

const makeSut = () => {
  const sut = new EmailValidatorImpl()
  return { sut }
}
describe('EmailValidatorImpl', () => {
  it('should return true if email is valid', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const isValid = await sut.isValid(email)
    expect(isValid).toBe(true)
  })
  it('should return false if email is not valid', async () => {
    const { sut } = makeSut()
    const isValid = await sut.isValid('invalid_email')
    expect(isValid).toBe(false)
  })
  it('should call validator with correct email', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const spyValidator = jest.spyOn(validator, 'isEmail')
    await sut.isValid(email)
    expect(spyValidator).toHaveBeenCalledWith(email)
  })
})
