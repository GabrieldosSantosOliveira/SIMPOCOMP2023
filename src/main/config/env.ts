import 'dotenv/config'
export const env = {
  APP_PORT: process.env.APP_PORT ?? 3333,
  SECRET_ACCESS_TOKEN_KEY:
    process.env.SECRET_ACCESS_TOKEN_KEY ?? 'SECRET_ACCESS_TOKEN_KEY',
}
