import { type UserModel } from '@/domain/model/user'
import { type AddUserRepository } from '@/domain/repositories/add-user-repository'
import { type LoadUserByEmailRepository } from '@/domain/repositories/load-user-by-email-repository'

export class InMemoryUserRepository
  implements LoadUserByEmailRepository, AddUserRepository
{
  private readonly users: UserModel[] = []
  async add(user: AddUserRepository.Params): Promise<void> {
    this.users.push(user)
  }

  async findByEmail(
    email: string,
  ): Promise<LoadUserByEmailRepository.Result | null> {
    const userIndex = this.users.findIndex((user) => user.email === email)
    if (userIndex >= 0) {
      return this.users[userIndex]
    }
    return null
  }
}
