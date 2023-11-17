import { type GeneratorUUID } from '@/data/protocols/uuid/generator-uuid'
import { faker } from '@faker-js/faker'

export class GeneratorUUIDMock implements GeneratorUUID {
  public responseRandomUUID = faker.string.uuid()
  async randomUUID(): Promise<string> {
    return this.responseRandomUUID
  }
}
