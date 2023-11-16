import { UserAlreadyExistsException } from '@/domain/errors/user-already-exists-exception'
import { type AddUserRepository } from '@/domain/repositories/add-user-repository'
import { type LoadUserByEmailRepository } from '@/domain/repositories/load-user-by-email-repository'
import { type AddUserUseCase } from '@/domain/use-cases/add-user'

import { type Bcrypt } from '../protocols/cryptography/bcrypt'
import { type AuthService } from '../protocols/services/auth-service'
import { type GeneratorUUID } from '../protocols/uuid/generator-uuid'

export class AddUserUseCaseImpl implements AddUserUseCase {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly addUserRepository: AddUserRepository,
    private readonly authService: AuthService,
    private readonly bcrypt: Bcrypt,
    private readonly generatorUUID: GeneratorUUID,
  ) {}

  async execute(user: AddUserUseCase.Params): Promise<AddUserUseCase.Result> {
    const isUserAlreadyExists =
      await this.loadUserByEmailRepository.findByEmail(user.email)
    if (isUserAlreadyExists) {
      throw new UserAlreadyExistsException()
    }

    const passwordHash = await this.bcrypt.hash(user.password)
    const id = await this.generatorUUID.randomUUID()
    await this.addUserRepository.add({
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: passwordHash,
    })
    const accessToken = await this.authService.generateAccessToken(id)
    return { accessToken }
  }
}
