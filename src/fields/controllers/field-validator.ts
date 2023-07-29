import {
  FieldValueState,
  NonValidatedFieldValueState,
} from '../states/field-value-state'

export type FieldValidationFn<T> = (value: T) => string | undefined

export type FieldValidationResult = {
  readonly isValid: boolean
  readonly errorMessage: string | null
}

export abstract class FieldValidator<T, V extends FieldValueState<T>> {
  readonly required: boolean

  readonly validators: FieldValidationFn<T>[] | null

  constructor({
    required,
    validators,
  }: {
    required?: boolean
    validators?: FieldValidationFn<T>[]
  }) {
    // this.required = required ?? false
    this.required = required ?? true
    this.validators = validators ?? null
  }

  abstract validate(
    nonValidatedValueState: NonValidatedFieldValueState<T, V>,
  ): FieldValidationResult
}
