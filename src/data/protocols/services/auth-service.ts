export interface AuthService {
  generateAccessToken: (subject: string) => Promise<string>
  verifyAccessToken: (accessToken: string) => Promise<boolean>
  decryptAccessToken: (
    accessToken: string,
  ) => Promise<AuthService.DecryptAccessTokenResult>
}
export namespace AuthService {
  export interface DecryptAccessTokenResult {
    id: string
  }
}
