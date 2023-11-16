import { EmailValidatorImpl } from '@/infra/validators/email-validator-impl'

export const makeEmailValidator = () => new EmailValidatorImpl()
