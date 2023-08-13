import { IreTextElement } from '../../components/stateful/text-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { Field, FieldController } from './base/field-controller'

export type TextFieldType =
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

export type TextFieldValueState = FieldValueState<string>

export interface TextFieldUIState extends FieldUIState<IreTextElement> {
  inputType: TextFieldType | null
  max: string | null
  maxLength: number | null
  min: string | null
  minLength: number | null
  step: string
  placeholder: string | null
}

export type TextField = Field<
  string,
  TextFieldValueState,
  IreTextElement,
  TextFieldUIState
>

export class TextFieldController extends FieldController<
  string,
  TextFieldValueState,
  IreTextElement,
  TextFieldUIState
> {}

export type TextFieldDefinition = FieldDefinition<
  string,
  'text',
  TextFieldValueState,
  IreTextElement,
  TextFieldUIState
>

export type TextFieldMultiPatch = FieldMultiPatch<
  string,
  TextFieldValueState,
  IreTextElement,
  TextFieldUIState
>
