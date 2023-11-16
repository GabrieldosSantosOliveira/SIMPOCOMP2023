import { EmailValidatorImpl } from '@/infra/validators/email-validator-impl'
import { faker } from '@faker-js/faker'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: () => true,
}))
const makeSut = () => {
  const sut = new EmailValidatorImpl()
  return { sut }
}
describe('EmailValidatorImpl', () => {
  it('should return true if email is valid', async () => {
    const { sut } = makeSut()
    const isValid = await sut.isValid('any_email')
    expect(isValid).toBe(true)
  })
  it('should return false if email is not valid', async () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValue(false)
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
  it('should throw error if EmailValidatorImpl throw error', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    jest.spyOn(validator, 'isEmail').mockImplementationOnce(() => {
      throw new Error()
    })

    await expect(sut.isValid(email)).rejects.toThrow()
  })
})
