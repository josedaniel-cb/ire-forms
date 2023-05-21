import {
  FieldProps,
  FieldController,
  FieldBuilderParams,
} from '../field-controller'
import {
  FieldValueState,
  FieldUIState,
  NonValidatedFieldValueState,
} from '../field-state'
import { FieldValidationResult, FieldValidator } from '../field-validator'

export interface SelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T | null> {
  options: { label: string; value: T }[]
}

export type SelectFieldUIState = FieldUIState

export type SelectFieldProps<T extends NonNullable<unknown>> = FieldProps<
  T | null,
  SelectFieldValueState<T>,
  SelectFieldUIState
>

export class SelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  SelectFieldUIState
> {}

export type SelectFieldBuilderParams<T extends NonNullable<unknown>> =
  FieldBuilderParams<
    T | null,
    'select',
    SelectFieldValueState<T>,
    SelectFieldUIState
  >

export class SelectFieldValidator<
  T extends NonNullable<unknown>,
> extends FieldValidator<T | null, SelectFieldValueState<T>> {
  validate({
    enabled,
    value,
    options,
  }: NonValidatedFieldValueState<
    T | null,
    SelectFieldValueState<T>
  >): FieldValidationResult {
    const errorMessage = ((): string | undefined => {
      if (!enabled) return

      if (this.required) {
        if (value == null) {
          return 'This field is required'
        }
        const valueExistsAsOption = options.some(
          (option) => option.value === value,
        )
        if (!valueExistsAsOption) return `The value ${value} is not an option`
      }

      if (this.validators) {
        for (const validator of this.validators) {
          const errorMessage = validator(value)
          if (errorMessage) return errorMessage
        }
      }
    })()
    return { isValid: !!errorMessage, errorMessage: errorMessage ?? null }
  }
}
