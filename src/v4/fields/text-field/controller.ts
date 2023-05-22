import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldValueState, FieldUIState, FieldMultiPatch } from '../field-states'

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
