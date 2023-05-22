import { NonValidatedFieldValueState } from '../field-states'
import { FieldValidationResult, FieldValidator } from '../field-validator'
import { MultiSelectFieldValueState } from './controller'

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
