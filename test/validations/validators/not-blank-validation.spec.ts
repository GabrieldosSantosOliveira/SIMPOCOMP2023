import { BlankError } from '@/presentation/errors/blank-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { NotBlankValidation } from '@/validations/validators/not-blank-validation'
import { faker } from '@faker-js/faker'
const field = faker.lorem.words()
const makeSut = () => {
  const sut = new NotBlankValidation(field)
  return { sut }
}
describe('NotBlankValidation', () => {
  it('should return MissingParam if field no has value', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toEqual(new MissingParamError(field))
  })
  it('should return BlankError if field is empty', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: '' })
    expect(result).toEqual(new BlankError(field))
  })
  it('should return BlankError if field is blank', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: ' '.repeat(100) })
    expect(result).toEqual(new BlankError(field))
  })
  it('should return null if field is not a string', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({ [field]: 100 })
    expect(result).toEqual(null)
  })
})
