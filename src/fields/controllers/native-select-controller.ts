import { IreNativeSelectElement } from '../../components/stateful/native-select-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { Field, FieldController } from './base/field-controller'
import { SelectFieldValueState } from './select/select-value-state'

export interface NativeSelectFieldUIState
  extends FieldUIState<IreNativeSelectElement> {
  placeholder: string | null
}

export type NativeSelectField<T extends NonNullable<unknown>> = Field<
  T | null,
  SelectFieldValueState<T>,
  IreNativeSelectElement,
  NativeSelectFieldUIState
>

export class NativeSelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  IreNativeSelectElement,
  NativeSelectFieldUIState
> {}

export type NativeSelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T | null,
    'select',
    SelectFieldValueState<T>,
    IreNativeSelectElement,
    NativeSelectFieldUIState
  >

export type NativeSelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T | null,
    SelectFieldValueState<T>,
    IreNativeSelectElement,
    NativeSelectFieldUIState
  >
