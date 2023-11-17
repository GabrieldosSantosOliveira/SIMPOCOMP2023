import { AuthServiceImpl } from '@/infra/services/auth-service-impl'
import { faker } from '@faker-js/faker'

import { TokenGeneratorMock } from '../mocks/cryptography/token-generator-mock'

const SECRET_ACCESS_TOKEN_KEY = 'SECRET_ACCESS_TOKEN_KEY'
const THIRTY_MINUTES_IN_SECONDS = 60 * 30
const makeSut = () => {
  const tokenGeneratorMock = new TokenGeneratorMock()
  const sut = new AuthServiceImpl(tokenGeneratorMock, SECRET_ACCESS_TOKEN_KEY)
  return { sut, tokenGeneratorMock }
}
const id = faker.string.uuid()

describe('AuthServiceImpl', () => {
  describe('generateAccessToken', () => {
    it('should return accessToken if success', async () => {
      const { sut } = makeSut()
      const accessToken = await sut.generateAccessToken(id)
      expect(accessToken).toBeTruthy()
    })
    it('should call encrypt with correct values', async () => {
      const { sut, tokenGeneratorMock } = makeSut()
      const spyOnTokenGeneratorMock = jest.spyOn(tokenGeneratorMock, 'encrypt')
      await sut.generateAccessToken(id)
      expect(spyOnTokenGeneratorMock).toHaveBeenCalledWith(
        SECRET_ACCESS_TOKEN_KEY,
        THIRTY_MINUTES_IN_SECONDS,
        { subject: id },
      )
    })
  })
  describe('decryptAccessToken', () => {
    it('should return correct payload', async () => {
      const { sut, tokenGeneratorMock } = makeSut()
      const payload = await sut.decryptAccessToken('any_token')
      expect(payload).toEqual(tokenGeneratorMock.responseDecrypt.subject)
    })
    it('should call decrypt with correct values', async () => {
      const { sut, tokenGeneratorMock } = makeSut()
      const spyOnTokenGeneratorMock = jest.spyOn(tokenGeneratorMock, 'decrypt')
      await sut.decryptAccessToken('any_access_token')
      expect(spyOnTokenGeneratorMock).toHaveBeenCalledWith('any_access_token')
    })
  })
  describe('verifyAccessToken', () => {
    it('should return true when verifyAccessToken success', async () => {
      const { sut } = makeSut()
      const isValid = await sut.verifyAccessToken('any_access_token')
      expect(isValid).toBe(true)
    })
    it('should return false when verify fails', async () => {
      const { sut, tokenGeneratorMock } = makeSut()
      tokenGeneratorMock.isValid = false
      const isValid = await sut.verifyAccessToken('any_access_token')
      expect(isValid).toBe(false)
    })
  })
})
