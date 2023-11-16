import { BlankError } from '@/presentation/errors/blank-error'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class NotBlankValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  async validate(input: any): Promise<Error | null> {
    if (typeof input[this.fieldName] === 'string') {
      const valueTrim = input[this.fieldName].trim()
      if (valueTrim) {
        return null
      }
      return new BlankError(this.fieldName)
    }
    if (
      input[this.fieldName] ||
      input[this.fieldName] === null ||
      input[this.fieldName] === false ||
      input[this.fieldName] === 0
    ) {
      return null
    }
    return new MissingParamError(this.fieldName)
  }
}
