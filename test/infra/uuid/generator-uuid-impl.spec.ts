import { GeneratorUUIDImpl } from '@/infra/uuid/generator-uuid-impl'
import crypto from 'crypto'
const makeSut = () => {
  const sut = new GeneratorUUIDImpl()
  return { sut }
}
describe('GeneratorUUIDImpl', () => {
  it('should return uuid if success', async () => {
    const { sut } = makeSut()
    const uuid = await sut.randomUUID()
    expect(uuid).toBeTruthy()
  })
  it('should throw error if randomUUID throw error', async () => {
    const { sut } = makeSut()

    jest.spyOn(crypto, 'randomUUID').mockImplementation(() => {
      throw new Error()
    })
    await expect(sut.randomUUID()).rejects.toThrow()
  })
})
