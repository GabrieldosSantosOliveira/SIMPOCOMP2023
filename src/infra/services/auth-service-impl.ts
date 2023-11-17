import { type TokenGenerator } from '@/data/protocols/cryptography/token-generator'
import { type AuthService } from '@/data/protocols/services/auth-service'

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly SECRET_ACCESS_TOKEN_KEY: string,
  ) {}

  async generateAccessToken(subject: string): Promise<string> {
    const THIRTY_MINUTES_IN_SECONDS = 60 * 30
    const accessToken = await this.tokenGenerator.encrypt(
      this.SECRET_ACCESS_TOKEN_KEY,
      THIRTY_MINUTES_IN_SECONDS,
      {
        subject,
      },
    )
    return accessToken
  }

  async verifyAccessToken(accessToken: string): Promise<boolean> {
    const isValid = await this.tokenGenerator.verify(
      accessToken,
      this.SECRET_ACCESS_TOKEN_KEY,
    )
    return isValid
  }

  async decryptAccessToken(
    accessToken: string,
  ): Promise<AuthService.DecryptAccessTokenResult> {
    const payload = await this.tokenGenerator.decrypt(accessToken)
    if (!payload) {
      throw new Error('no has payload')
    }
    const id = payload.subject
    return id
  }
}
