import { IreInputElement } from '../../components/stateful/input-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { Field, FieldController } from './base/field-controller'

export type TextFieldValueState = FieldValueState<string>

export interface TextFieldUIState extends FieldUIState<IreInputElement> {
  placeholder: string | null
}

export type TextField = Field<
  string,
  TextFieldValueState,
  IreInputElement,
  TextFieldUIState
>

export class TextFieldController extends FieldController<
  string,
  TextFieldValueState,
  IreInputElement,
  TextFieldUIState
> {}

export type TextFieldDefinition = FieldDefinition<
  string,
  'text',
  TextFieldValueState,
  IreInputElement,
  TextFieldUIState
>

export type TextFieldMultiPatch = FieldMultiPatch<
  string,
  TextFieldValueState,
  IreInputElement,
  TextFieldUIState
>
