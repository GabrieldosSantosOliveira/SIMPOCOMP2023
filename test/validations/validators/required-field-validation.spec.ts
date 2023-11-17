import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/validations/validators/required-field-validation'
const field = 'any_field'
const makeSut = () => {
  const sut = new RequiredFieldValidation(field)
  return { sut }
}
describe('RequiredFieldValidation', () => {
  it('should return MissingParamError if field is no provided', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toEqual(new MissingParamError(field))
  })
  it('should return null if field is a string', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: '',
    })
    expect(result).toEqual(null)
  })
  it('should return null if field is a number', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: 10,
    })
    expect(result).toEqual(null)
  })
  it('should return null if field is a object', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: {},
    })
    expect(result).toEqual(null)
  })
  it('should return null if field is a boolean', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: false,
    })
    expect(result).toEqual(null)
  })
  it('should return null if field is null', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: null,
    })
    expect(result).toEqual(null)
  })
  it('should return null if field is provided', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: '',
    })
    expect(result).toEqual(null)
  })
})
