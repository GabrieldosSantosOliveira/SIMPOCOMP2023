import { TokenGeneratorImpl } from '@/infra/cryptography/token-generator-impl'
import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'
const SECRET = faker.lorem.words()
const DURATION = faker.number.int({ min: 10 })
const id = faker.string.uuid()

jest.mock('jsonwebtoken', () => ({
  sign() {
    return 'any_token'
  },
  verify() {
    return { id }
  },
  decode() {
    return { id }
  },
}))
const makeSut = async () => {
  const sut = new TokenGeneratorImpl()
  const token = await sut.encrypt(SECRET, DURATION, { id })

  return { sut, token }
}

describe('TokenGeneratorImpl', () => {
  describe('encrypt', () => {
    beforeEach(() => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        return 'any_token'
      })
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        return { id }
      })
      jest.spyOn(jwt, 'decode').mockImplementation(() => {
        return { id }
      })
    })
    it('should return token if success', async () => {
      const { sut } = await makeSut()

      const token = await sut.encrypt(SECRET, DURATION, { id })
      expect(token).toBe('any_token')
    })
    it('should call sign with correct values', async () => {
      const { sut } = await makeSut()
      const spyOnJwt = jest.spyOn(jwt, 'sign')
      await sut.encrypt(SECRET, DURATION, { id })
      expect(spyOnJwt).toHaveBeenCalledWith({ id }, SECRET, {
        expiresIn: DURATION * 1000,
      })
    })
    it('should throw error if jsonwebtoken throw error', async () => {
      const { sut } = await makeSut()
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        throw new Error()
      })
      await expect(sut.encrypt(SECRET, DURATION, { id })).rejects.toThrow()
    })
  })
  describe('decrypt', () => {
    beforeEach(() => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        return 'any_token'
      })
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        return { id }
      })
      jest.spyOn(jwt, 'decode').mockImplementation(() => {
        return { id }
      })
    })
    it('should return correct payload', async () => {
      const { sut, token } = await makeSut()
      const payload = await sut.decrypt(token)
      expect(payload).toEqual({ id })
    })
    it('should call decode with correct values', async () => {
      const { sut, token } = await makeSut()
      const spyOnJwt = jest.spyOn(jwt, 'decode')
      await sut.decrypt(token)
      expect(spyOnJwt).toHaveBeenCalledWith(token)
    })
    it('should throw error if jsonwebtoken throw error', async () => {
      const { sut, token } = await makeSut()
      jest.spyOn(jwt, 'decode').mockImplementation(() => {
        throw new Error()
      })
      await expect(sut.decrypt(token)).rejects.toThrow()
    })
  })
  describe('verify', () => {
    beforeEach(() => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        return 'any_token'
      })
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        return { id }
      })
      jest.spyOn(jwt, 'decode').mockImplementation(() => {
        return { id }
      })
    })
    it('should return true when verify success', async () => {
      const { sut, token } = await makeSut()
      const isValid = await sut.verify(token, SECRET)
      expect(isValid).toBe(true)
    })
    it('should return false when verify fails', async () => {
      const { sut, token } = await makeSut()
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error()
      })
      const isValid = await sut.verify(token, SECRET)
      expect(isValid).toBe(false)
    })
    it('should call verify with correct values', async () => {
      const { sut, token } = await makeSut()
      const spyOnJwt = jest.spyOn(jwt, 'verify')
      await sut.verify(token, SECRET)
      expect(spyOnJwt).toHaveBeenCalledWith(token, SECRET)
    })
  })
})
