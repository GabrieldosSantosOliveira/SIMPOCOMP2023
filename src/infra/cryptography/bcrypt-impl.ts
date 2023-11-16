import { type Bcrypt } from '@/data/protocols/cryptography/bcrypt'
import bcrypt from 'bcrypt'
export class BcryptImpl implements Bcrypt {
  constructor(private readonly salt: number) {}
  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}
