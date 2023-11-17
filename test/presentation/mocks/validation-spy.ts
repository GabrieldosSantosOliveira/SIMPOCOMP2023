import { type Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  responseValidate: Error | null = null
  input: any
  async validate(input: any): Promise<Error | null> {
    this.input = input
    return this.responseValidate
  }
}
