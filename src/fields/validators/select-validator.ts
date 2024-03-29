import { SelectFieldValueState } from '../controllers/select/select-value-state'
import { NonValidatedFieldValueState } from '../states/field-value-state'
import { FieldValidationResult, FieldValidator } from './base/field-validator'

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

    return {
      isValid: errorMessage === undefined,
      errorMessage: errorMessage ?? null,
    }
  }
}
