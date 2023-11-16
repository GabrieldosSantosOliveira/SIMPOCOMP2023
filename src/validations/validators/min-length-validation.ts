import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class MinLengthValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly minlength: number,
  ) {}

  async validate(input: any): Promise<Error | null> {
    if (typeof input[this.fieldName] === 'string') {
      const length = input[this.fieldName].length
      if (length <= this.minlength) {
        return new InvalidParamError(this.fieldName)
      }
      return null
    }
    return null
  }
}
