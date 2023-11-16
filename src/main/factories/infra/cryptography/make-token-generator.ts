import { TokenGeneratorImpl } from '@/infra/cryptography/token-generator-impl'

export const makeTokenGenerator = () => new TokenGeneratorImpl()
