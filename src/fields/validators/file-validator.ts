import { FileFieldValueState } from '../controllers/file-controller'
import { NonValidatedFieldValueState } from '../states/field-value-state'
import { FieldValidationResult, FieldValidator } from './base/field-validator'

export class FileFieldValidator extends FieldValidator<
  File[],
  FileFieldValueState
> {
  validate({
    enabled,
    value,
  }: NonValidatedFieldValueState<
    File[],
    FileFieldValueState
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
