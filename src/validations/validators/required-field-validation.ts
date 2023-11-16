import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { type Validation } from '@/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}
  async validate(input: any): Promise<Error | null> {
    if (
      input[this.fieldName] ||
      input[this.fieldName] === null ||
      input[this.fieldName] === false ||
      input[this.fieldName] === '' ||
      input[this.fieldName] === 0
    ) {
      return null
    }
    return new MissingParamError(this.fieldName)
  }
}
