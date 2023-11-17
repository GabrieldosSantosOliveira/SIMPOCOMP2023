import { type Bcrypt } from '@/data/protocols/cryptography/bcrypt'

export class BcryptMock implements Bcrypt {
  public responseHash = 'any_digest'
  public responseCompare = true

  async hash(): Promise<string> {
    return this.responseHash
  }

  async compare(): Promise<boolean> {
    return this.responseCompare
  }
}
