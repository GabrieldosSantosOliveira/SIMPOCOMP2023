import { prismaService } from '@/infra/database/prisma-service'
import { setupApp } from '@/main/config/setup-app'
import { faker } from '@faker-js/faker'
import { type Express } from 'express'
import request from 'supertest'
let app: Express
const URL = '/api/user'
interface MakeUserParams {
  firstName: any
  lastName: any
  password: any
  email: any
}
const makeUser = (params: Partial<MakeUserParams> = {}) => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: 'A#1a12345678',
    email: faker.internet.email(),
    ...params,
  }
}
describe('AddUserRoute', () => {
  beforeAll(async () => {
    const setup = await setupApp()
    app = setup.app
  })
  beforeEach(async () => {
    await prismaService.user.deleteMany()
  })
  afterAll(async () => {
    prismaService.$disconnect()
  })
  it('should return 400 if email is not provided', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ email: undefined }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if lastName is not provided', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ lastName: undefined }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if firstName is not provided', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ firstName: undefined }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if password is not provided', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ password: undefined }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if a invalid email is provided', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ email: 'invalid_email' }))
    expect(statusCode).toEqual(400)
  })
  it('should return 400 if is not provided a password with 8 letters, a lowercase and uppercase letter, a number and a special character ', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ password: 'invalid' }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if password is not a string', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ password: 2 }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if email is not a string', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ email: 2 }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if lastName is not a string', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ lastName: 2 }))
    expect(statusCode).toBe(400)
  })
  it('should return 400 if firstName is not a string', async () => {
    const { statusCode } = await request(app)
      .post(URL)
      .send(makeUser({ firstName: 2 }))
    expect(statusCode).toBe(400)
  })
  it('should return accessToken if success', async () => {
    const { statusCode, body } = await request(app).post(URL).send(makeUser())

    expect(statusCode).toBe(201)
    expect(body).toHaveProperty('accessToken')
  })
  it('should return 409 if user already exists', async () => {
    const user = makeUser()
    await prismaService.user.create({
      data: {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: faker.string.uuid(),
      },
    })

    const { statusCode, body } = await request(app).post(URL).send(user)
    expect(statusCode).toBe(409)
    expect(body).toEqual({ message: 'User already exists' })
  })
})
