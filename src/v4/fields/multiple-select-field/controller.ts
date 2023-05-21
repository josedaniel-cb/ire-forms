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

export interface MultiSelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T[]> {
  options: { label: string; value: T }[]
}

export type MultiSelectFieldUIState = FieldUIState

export type MultiSelectFieldProps<T extends NonNullable<unknown>> = FieldProps<
  T[],
  MultiSelectFieldValueState<T>,
  MultiSelectFieldUIState
>

export class MultiSelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  MultiSelectFieldUIState
> {}

export type MultiSelectFieldBuilderParams<T extends NonNullable<unknown>> =
  FieldBuilderParams<
    T[],
    'multi-select',
    MultiSelectFieldValueState<T>,
    MultiSelectFieldUIState
  >

export class MultiSelectFieldValidator<
  T extends NonNullable<unknown>,
> extends FieldValidator<T[], MultiSelectFieldValueState<T>> {
  validate({
    enabled,
    value,
    options,
  }: NonValidatedFieldValueState<
    T[],
    MultiSelectFieldValueState<T>
  >): FieldValidationResult {
    const errorMessage = ((): string | undefined => {
      if (!enabled) return

      if (this.required) {
        if (value.length === 0) {
          return 'At least one value is required'
        }
        for (const valueItem of value) {
          const valueItemExistsAsOption = options.find(
            (option) => option.value === valueItem,
          )
          if (!valueItemExistsAsOption)
            return `The value ${valueItem} is not an option`
        }
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
