import { FieldProps, FieldController } from '../field-controller'
import { TextFieldState } from './state'

export interface TextFieldProps extends FieldProps<string, TextFieldState> {
  readonly state: TextFieldState
}

export abstract class TextFieldController<T> extends FieldController<
  string,
  TextFieldState
> {
  constructor(params: TextFieldProps) {
    super(params)
  }
}
