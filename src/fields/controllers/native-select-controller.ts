import { IreSelectElement } from '../../components/stateful/select-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { Field, FieldController } from './base/field-controller'
import { SelectFieldValueState } from './select/select-value-state'

export interface SelectFieldUIState extends FieldUIState<IreSelectElement> {
  placeholder: string | null
}

export type SelectField<T extends NonNullable<unknown>> = Field<
  T | null,
  SelectFieldValueState<T>,
  IreSelectElement,
  SelectFieldUIState
>

export class SelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  IreSelectElement,
  SelectFieldUIState
> {}

export type SelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T | null,
    'select',
    SelectFieldValueState<T>,
    IreSelectElement,
    SelectFieldUIState
  >

export type SelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T | null,
    SelectFieldValueState<T>,
    IreSelectElement,
    SelectFieldUIState
  >
