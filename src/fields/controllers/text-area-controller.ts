import { IreTextAreaElement } from '../../components/stateful/text-area-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { Field, FieldController } from './base/field-controller'

export type TextAreaFieldValueState = FieldValueState<string>

export interface TextAreaFieldUIState extends FieldUIState<IreTextAreaElement> {
  cols: number | null
  rows: number | null
  maxLength: number | null
  minLength: number | null
  placeholder: string | null
  wrap: 'hard' | 'soft' | null
  resize: boolean | null // css resize property
}

export type TextAreaField = Field<
  string,
  TextAreaFieldValueState,
  IreTextAreaElement,
  TextAreaFieldUIState
>

export class TextAreaFieldController extends FieldController<
  string,
  TextAreaFieldValueState,
  IreTextAreaElement,
  TextAreaFieldUIState
> {}

export type TextAreaFieldDefinition = FieldDefinition<
  string,
  'text',
  TextAreaFieldValueState,
  IreTextAreaElement,
  TextAreaFieldUIState
>

export type TextAreaFieldMultiPatch = FieldMultiPatch<
  string,
  TextAreaFieldValueState,
  IreTextAreaElement,
  TextAreaFieldUIState
>
