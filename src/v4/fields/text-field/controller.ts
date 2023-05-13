import {
  FieldProps,
  FieldController,
  FieldState,
  FieldParams,
} from '../field-controller'

export interface TextFieldState extends FieldState<string> {
  placeholder?: string
}

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

export type TextFieldParams = FieldParams<TextFieldState, 'text'>
