import { type GeneratorUUID } from '@/data/protocols/uuid/generator-uuid'
import { randomUUID } from 'crypto'

export class GeneratorUUIDImpl implements GeneratorUUID {
  async randomUUID(): Promise<string> {
    return randomUUID()
  }
}
