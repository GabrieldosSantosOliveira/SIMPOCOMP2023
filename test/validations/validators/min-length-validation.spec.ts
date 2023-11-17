import { MinLengthError } from '@/presentation/errors/min-length-error'
import { MinLengthValidation } from '@/validations/validators/min-length-validation'
import { faker } from '@faker-js/faker'
const field = 'any_field'
const MIN_LENGTH = 5
const makeSut = () => {
  const sut = new MinLengthValidation(field, MIN_LENGTH)
  return { sut }
}
describe('MinLengthValidation', () => {
  it('should return null is no has field', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({})
    expect(result).toBe(null)
  })
  it('should return MinLengthError when field length is less than min length', async () => {
    const { sut } = makeSut()
    const fieldVAlue = faker.lorem.word(MIN_LENGTH - 1)
    const result = await sut.validate({
      [field]: fieldVAlue,
    })
    expect(result).toEqual(new MinLengthError(field, MIN_LENGTH))
  })
  it('should return null if success', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: faker.lorem.word(MIN_LENGTH),
    })
    expect(result).toEqual(new MinLengthError(field, MIN_LENGTH))
  })
  it('should return null if field is not a string', async () => {
    const { sut } = makeSut()
    const result = await sut.validate({
      [field]: 2,
    })
    expect(result).toEqual(null)
  })
})
