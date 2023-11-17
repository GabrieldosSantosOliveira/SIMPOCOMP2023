import { BcryptImpl } from '@/infra/cryptography/bcrypt-impl'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
jest.mock('bcrypt', () => ({
  hash() {
    return 'any_digest'
  },
  compare() {
    return true
  },
}))
const salt = 12
const makeSut = () => {
  const sut = new BcryptImpl(salt)
  return { sut }
}
const plaintext = faker.lorem.words()
const digest = faker.lorem.words()

describe('BcryptImpl', () => {
  describe('hash', () => {
    it('should return digest if success', async () => {
      const { sut } = makeSut()
      const digest = await sut.hash(plaintext)
      expect(digest).toBe('any_digest')
    })
    it('should call bcrypt with correct value', async () => {
      const { sut } = makeSut()
      const spyOnBcrypt = jest.spyOn(bcrypt, 'hash')
      await sut.hash(plaintext)
      expect(spyOnBcrypt).toHaveBeenCalledWith(plaintext, salt)
    })
    it('should throw error if bcrypt throw error', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
        throw new Error()
      })
      await expect(sut.hash(plaintext)).rejects.toThrow()
    })
  })
  describe('compare', () => {
    it('should return true if compare success', async () => {
      const { sut } = makeSut()
      const isValid = await sut.compare(plaintext, digest)
      expect(isValid).toBe(true)
    })
    it('should return false if compare fails', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => false)
      const isValid = await sut.compare(plaintext, digest)
      expect(isValid).toBe(false)
    })
    it('should call bcrypt with correct value', async () => {
      const { sut } = makeSut()
      const spyOnBcrypt = jest.spyOn(bcrypt, 'compare')
      await sut.compare(plaintext, digest)
      expect(spyOnBcrypt).toHaveBeenCalledWith(plaintext, digest)
    })
    it('should throw error if bcrypt throw error', async () => {
      const { sut } = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        throw new Error()
      })
      await expect(sut.compare(plaintext, digest)).rejects.toThrow()
    })
  })
})
