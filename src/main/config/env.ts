import 'dotenv/config'
export const env = {
  SECRET_ACCESS_TOKEN_KEY:
    process.env.SECRET_ACCESS_TOKEN_KEY ?? 'SECRET_ACCESS_TOKEN_KEY',
}
