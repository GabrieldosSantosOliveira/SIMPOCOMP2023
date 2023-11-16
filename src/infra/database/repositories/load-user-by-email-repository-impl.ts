import { type LoadUserByEmailRepository } from '@/domain/repositories/load-user-by-email-repository'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { prismaService } from '../prisma-service'

export class LoadUserByEmailRepositoryImpl
  implements LoadUserByEmailRepository
{
  async findByEmail(
    email: string,
  ): Promise<LoadUserByEmailRepository.Result | null> {
    const rawUser = await prismaService.user.findFirst({
      where: {
        email,
      },
    })
    if (!rawUser) {
      return null
    }
    return PrismaUserMapper.toDomain(rawUser)
  }
}
