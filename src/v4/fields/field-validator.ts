export type FieldValidationFn<T> = (value: T) => string | undefined

export type FieldValidationResult = {
  readonly isValid: boolean
  readonly errorMessage: string | null
}

export class FieldValidator<T> {
  readonly required: boolean

  readonly validators: FieldValidationFn<T>[] | null

  constructor({
    required,
    validators,
  }: {
    required?: boolean
    validators?: FieldValidationFn<T>[]
  }) {
    this.required = required ?? false
    this.validators = validators ?? null
  }

  validate(value: T): FieldValidationResult {
    throw new Error('Method not implemented.')
  }
}
