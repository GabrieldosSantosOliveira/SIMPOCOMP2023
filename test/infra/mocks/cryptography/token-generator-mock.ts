import { type TokenGenerator } from '@/data/protocols/cryptography/token-generator'

export class TokenGeneratorMock implements TokenGenerator {
  public isValid = true
  public responseEncrypt = 'any_token'
  public responseDecrypt = { subject: 'any_id' }

  async verify(): Promise<boolean> {
    return this.isValid
  }

  async encrypt(): Promise<string> {
    return this.responseEncrypt
  }

  async decrypt(): Promise<Record<string, any> | null> {
    return this.responseDecrypt
  }
}
