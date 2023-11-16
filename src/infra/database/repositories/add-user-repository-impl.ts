import { type AddUserRepository } from '@/domain/repositories/add-user-repository'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { prismaService } from '../prisma-service'

export class AddUserRepositoryImpl implements AddUserRepository {
  async add(user: AddUserRepository.Params): Promise<void> {
    const rawUser = PrismaUserMapper.toPrisma(user)
    await prismaService.user.create({ data: rawUser })
  }
}
