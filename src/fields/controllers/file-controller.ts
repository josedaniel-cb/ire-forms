import { IreFileElement } from '../../components/stateful/file-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { Field, FieldController } from './base/field-controller'

export type FileFieldValueState = FieldValueState<File[]>

export interface FileFieldUIState extends FieldUIState<IreFileElement> {
  accept: string | null
  capture: 'user' | 'environment' | null // mobile onl
  multiple: boolean | null
  placeholder: string | null
}

export type FileField = Field<
  File[],
  FileFieldValueState,
  IreFileElement,
  FileFieldUIState
>

export class FileFieldController extends FieldController<
  File[],
  FileFieldValueState,
  IreFileElement,
  FileFieldUIState
> {}

export type FileFieldDefinition = FieldDefinition<
  File[],
  'file',
  FileFieldValueState,
  IreFileElement,
  FileFieldUIState
>

export type FileFieldMultiPatch = FieldMultiPatch<
  File[],
  FileFieldValueState,
  IreFileElement,
  FileFieldUIState
>
