import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class StringValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  async validate(input: any): Promise<Error | null> {
    if (typeof input[this.fieldName] === 'string') {
      return null
    }
    return new InvalidParamError(this.fieldName)
  }
}
