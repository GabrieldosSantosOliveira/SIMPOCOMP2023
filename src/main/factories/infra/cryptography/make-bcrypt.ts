import { BcryptImpl } from '@/infra/cryptography/bcrypt-impl'

export const makeBcrypt = () => new BcryptImpl(12)
