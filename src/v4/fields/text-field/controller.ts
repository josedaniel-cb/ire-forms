import {
  FieldProps,
  FieldController,
  FieldBuilderParams,
} from '../field-controller'
import { FieldState } from '../field-state'

export interface TextFieldState extends FieldState<string> {
  placeholder?: string
}

export type TextFieldProps = FieldProps<string, TextFieldState>

export class TextFieldController extends FieldController<
  string,
  TextFieldState
> {}

export type TextFieldBuilderParams = FieldBuilderParams<
  string,
  TextFieldState,
  'text'
>
