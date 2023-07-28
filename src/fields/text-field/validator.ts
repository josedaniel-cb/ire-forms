import { FieldValidationResult, FieldValidator } from '../field-validator'
import { NonValidatedFieldValueState } from '../field-value-state'
import { TextFieldValueState } from './controller'

export class TextFieldValidator extends FieldValidator<
  string,
  TextFieldValueState
> {
  validate({
    enabled,
    value,
  }: NonValidatedFieldValueState<
    string,
    TextFieldValueState
  >): FieldValidationResult {
    const errorMessage = ((): string | undefined => {
      if (!enabled) return
      if (this.required && value.length === 0) return 'This field is required'
      if (this.validators) {
        for (const validator of this.validators) {
          const errorMessage = validator(value)
          if (errorMessage) return errorMessage
        }
      }
    })()
    return {
      isValid: errorMessage === undefined,
      errorMessage: errorMessage !== undefined ? errorMessage : null,
    }
  }
}
