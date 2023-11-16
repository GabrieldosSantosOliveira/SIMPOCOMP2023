import { type UserModel } from '@/domain/model/user'
import { type User as RawUser } from '@prisma/client'
export class PrismaUserMapper {
  static toPrisma(user: UserModel): RawUser {
    return {
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      password: user.password,
      updatedAt: user.updatedAt,
    }
  }

  static toDomain(rawUser: RawUser): UserModel {
    return {
      createdAt: rawUser.createdAt,
      email: rawUser.email,
      firstName: rawUser.firstName,
      id: rawUser.id,
      lastName: rawUser.lastName,
      password: rawUser.password,
      updatedAt: rawUser.updatedAt,
    }
  }
}
