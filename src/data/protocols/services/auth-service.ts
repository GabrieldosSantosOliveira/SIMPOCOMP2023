export interface AuthService {
  generateAccessToken: (subject: string) => Promise<string>
  validateAccessToken: (accessToken: string) => Promise<boolean>
}
