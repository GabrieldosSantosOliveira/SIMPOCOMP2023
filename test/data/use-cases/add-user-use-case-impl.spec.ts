import { AddUserUseCaseImpl } from '@/data/use-cases/add-user-use-case-impl'
import { UserAlreadyExistsException } from '@/domain/errors/user-already-exists-exception'
import { type AddUserUseCase } from '@/domain/use-cases/add-user'
import { BcryptMock } from '@/test/infra/mocks/cryptography/bcrypt-mock'
import { InMemoryUserRepository } from '@/test/infra/mocks/database/repositories/in-memory-user-repository'
import { AuthServiceMock } from '@/test/infra/mocks/services/auth-service-mock'
import { GeneratorUUIDMock } from '@/test/infra/mocks/uuid/generator-uuid-mock'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const inMemoryUserRepository = new InMemoryUserRepository()
  const bcryptMock = new BcryptMock()
  const authServiceMock = new AuthServiceMock()
  const generatorUUIDMock = new GeneratorUUIDMock()
  const sut = new AddUserUseCaseImpl(
    inMemoryUserRepository,
    inMemoryUserRepository,
    authServiceMock,
    bcryptMock,
    generatorUUIDMock,
  )
  return {
    sut,
    generatorUUIDMock,
    authServiceMock,
    bcryptMock,
    inMemoryUserRepository,
  }
}
const makeRequest = (): AddUserUseCase.Params => {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: faker.internet.password(),
  }
}
describe('AddUserUseCaseImpl', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should save user if success', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeRequest()
    await sut.execute(user)
    const userIsSave = await inMemoryUserRepository.findByEmail(user.email)
    expect(userIsSave).toBeTruthy()
  })
  it('should return accessToken if success', async () => {
    const { sut } = makeSut()
    const user = makeRequest()
    const response = await sut.execute(user)
    expect(response).toHaveProperty('accessToken')
  })
  it('should throw exception if user already in exists', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeRequest()
    await inMemoryUserRepository.add({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: faker.string.uuid(),
    })
    await expect(sut.execute(user)).rejects.toThrow(UserAlreadyExistsException)
  })
  it('should save password as hash', async () => {
    const { sut, inMemoryUserRepository, bcryptMock } = makeSut()
    const user = makeRequest()

    await sut.execute(user)

    const userSaveInDatabase = await inMemoryUserRepository.findByEmail(
      user.email,
    )
    expect(userSaveInDatabase?.password).toEqual(bcryptMock.responseHash)
  })
  it('should call bcrypt with correct param', async () => {
    const { sut, bcryptMock } = makeSut()
    const user = makeRequest()
    const spyOnBcrypt = jest.spyOn(bcryptMock, 'hash')
    await sut.execute(user)

    expect(spyOnBcrypt).toHaveBeenCalledWith(user.password)
  })
  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, inMemoryUserRepository } = makeSut()
    const user = makeRequest()

    const spyOnInMemoryUserRepository = jest.spyOn(
      inMemoryUserRepository,
      'findByEmail',
    )

    await sut.execute(user)

    expect(spyOnInMemoryUserRepository).toHaveBeenCalledWith(user.email)
  })
  it('should call AuthService with correct id', async () => {
    const { sut, authServiceMock, inMemoryUserRepository } = makeSut()
    const user = makeRequest()

    const spyOnAuthServiceMock = jest.spyOn(
      authServiceMock,
      'generateAccessToken',
    )

    await sut.execute(user)
    const userSaveInDatabase = await inMemoryUserRepository.findByEmail(
      user.email,
    )
    expect(spyOnAuthServiceMock).toHaveBeenCalledWith(userSaveInDatabase?.id)
  })
  it('should call AddUserRepository with user', async () => {
    const { sut, inMemoryUserRepository, bcryptMock, generatorUUIDMock } =
      makeSut()
    const user = makeRequest()

    const spyOnInMemoryUserRepository = jest.spyOn(
      inMemoryUserRepository,
      'add',
    )

    await sut.execute(user)

    expect(spyOnInMemoryUserRepository).toHaveBeenCalledWith({
      ...user,
      id: generatorUUIDMock.responseRandomUUID,
      password: bcryptMock.responseHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
