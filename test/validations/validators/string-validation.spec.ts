import { RequiredStringError } from '@/presentation/errors/required-string-error'
import { StringValidation } from '@/validations/validators/string-validation'
const field = 'any_field'
const makeSut = () => {
  const sut = new StringValidation(field)
  return { sut }
}
describe('StringValidation', () => {
  it('should return null is field is not provided', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toBe(null)
  })
  it('should return RequiredStringError is field is a number', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 2 })
    expect(result).toEqual(new RequiredStringError(field))
  })
  it('should return RequiredStringError is field is a boolean', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: false })
    expect(result).toEqual(new RequiredStringError(field))
  })
  it('should return RequiredStringError is field is null', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: null })
    expect(result).toEqual(new RequiredStringError(field))
  })
  it('should return RequiredStringError is field is a object', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: {} })
    expect(result).toEqual(new RequiredStringError(field))
  })
})
