import {
  AddUserController,
  type AddUserControllerRequestBody,
} from '@/presentation/controllers/add-user-controller'
import { HttpStatus } from '@/presentation/helpers/http-status'
import { type HttpRequest } from '@/presentation/protocols/http/http-request'
import { AddUserUseCaseMock } from '@/test/data/mocks/use-cases/add-user-use-case-mock'
import { faker } from '@faker-js/faker'

import { ValidationSpy } from '../mocks/validation-spy'

const makeSut = () => {
  const addUserUseCaseMock = new AddUserUseCaseMock()
  const validationSpy = new ValidationSpy()
  const sut = new AddUserController(validationSpy, addUserUseCaseMock)
  return { sut, addUserUseCaseMock, validationSpy }
}
const makeRequest = (
  user: Partial<AddUserControllerRequestBody> = {},
): HttpRequest<AddUserControllerRequestBody, any, any> => {
  return {
    body: {
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
      ...user,
    },
    params: {},
    query: {},
  }
}
describe('AddUserController', () => {
  it('should return 400 if email is not provided', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.responseValidate = new Error()
    const response = await sut.execute(makeRequest({ email: undefined }))
    expect(response.body).toEqual({
      message: validationSpy.responseValidate.message,
    })
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
  })
  it('should return 400 if firstName is not provided', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.responseValidate = new Error()
    const response = await sut.execute(makeRequest({ firstName: undefined }))
    expect(response.body).toEqual({
      message: validationSpy.responseValidate.message,
    })
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
  })
  it('should return 400 if lastName is not provided', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.responseValidate = new Error()
    const response = await sut.execute(makeRequest({ lastName: undefined }))
    expect(response.body).toEqual({
      message: validationSpy.responseValidate.message,
    })
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
  })
  it('should return 400 if password is not provided', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.responseValidate = new Error()
    const response = await sut.execute(makeRequest({ lastName: undefined }))
    expect(response.body).toEqual({
      message: validationSpy.responseValidate.message,
    })
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
  })
  it('should return 400 if invalid email is provided', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.responseValidate = new Error()
    const response = await sut.execute(makeRequest({ email: 'invalid_email' }))
    expect(response.body).toEqual({
      message: validationSpy.responseValidate.message,
    })
    expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST)
  })
  it('should call AddUserUseCase with correct values', async () => {
    const { sut, addUserUseCaseMock } = makeSut()
    const request = makeRequest()
    await sut.execute(request)
    expect(addUserUseCaseMock.user).toEqual(request.body)
  })
  it('should return accessToken if success', async () => {
    const { sut, addUserUseCaseMock } = makeSut()
    const request = makeRequest()
    const response = await sut.execute(request)
    expect(response.body).toEqual(addUserUseCaseMock.responseAddUserUseCase)
    expect(response.statusCode).toBe(HttpStatus.CREATED)
  })
})
