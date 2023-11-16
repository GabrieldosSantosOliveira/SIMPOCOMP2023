import { type Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}
  async validate(input: any): Promise<Error | null> {
    for (const validation of this.validations) {
      const isValid = await validation.validate(input)
      if (isValid instanceof Error) {
        return isValid
      }
    }
    return null
  }
}
