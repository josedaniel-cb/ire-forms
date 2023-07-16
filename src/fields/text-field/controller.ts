import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldMultiPatch } from '../field-multi-patch'
import { FieldUIState } from '../field-ui-state'
import { FieldValueState } from '../field-value-state'

export type TextFieldValueState = FieldValueState<string>

export interface TextFieldUIState extends FieldUIState {
  placeholder: string | null
}

export type TextField = Field<string, TextFieldValueState, TextFieldUIState>

export class TextFieldController extends FieldController<
  string,
  TextFieldValueState,
  TextFieldUIState
> {}

export type TextFieldDefinition = FieldDefinition<
  string,
  'text',
  TextFieldValueState,
  TextFieldUIState
>

export type TextFieldMultiPatch = FieldMultiPatch<
  string,
  TextFieldValueState,
  TextFieldUIState
>
