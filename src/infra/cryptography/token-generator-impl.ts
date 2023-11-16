import { type TokenGenerator } from '@/data/protocols/cryptography/token-generator'
import * as jwt from 'jsonwebtoken'
export class TokenGeneratorImpl implements TokenGenerator {
  async verify(chiphertext: string, secretKey: string): Promise<boolean> {
    try {
      jwt.verify(chiphertext, secretKey)
      return true
    } catch {
      return false
    }
  }

  async encrypt(
    secretKey: string,
    durationInSeconds: number,
    claims: Record<string, any>,
  ): Promise<string> {
    const EXPIRATION_IN_MILI_SECOND = durationInSeconds * 1000
    const token = jwt.sign(claims, secretKey, {
      expiresIn: EXPIRATION_IN_MILI_SECOND,
    })
    return token
  }

  async decrypt(chiphertext: string): Promise<Record<string, any>> {
    return jwt.decode(chiphertext) as jwt.JwtPayload
  }
}
