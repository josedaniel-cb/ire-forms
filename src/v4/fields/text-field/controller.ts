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

export type TextFieldValueState = FieldValueState<string>

export interface TextFieldUIState extends FieldUIState {
  placeholder: string | null
}

export type TextFieldProps = FieldProps<
  string,
  TextFieldValueState,
  TextFieldUIState
>

export class TextFieldController extends FieldController<
  string,
  TextFieldValueState,
  TextFieldUIState
> {}

export type TextFieldBuilderParams = FieldBuilderParams<
  string,
  'text',
  TextFieldValueState,
  TextFieldUIState
>

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
      if (this.required && !value) return 'This field is required'
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
