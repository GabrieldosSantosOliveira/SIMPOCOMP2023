import { type AuthService } from '@/data/protocols/services/auth-service'

export class AuthServiceMock implements AuthService {
  public responseGenerateAccessToken = 'any_access_token'
  public responseVerifyAccessToken = true
  public responseDecryptAccessToken: AuthService.DecryptAccessTokenResult = {
    id: 'any_id',
  }

  async generateAccessToken(): Promise<string> {
    return this.responseGenerateAccessToken
  }

  async verifyAccessToken(): Promise<boolean> {
    return this.responseVerifyAccessToken
  }

  async decryptAccessToken(): Promise<AuthService.DecryptAccessTokenResult> {
    return this.responseDecryptAccessToken
  }
}
