import { IreSelectElement } from '../../components/stateful/select-element'
import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldMultiPatch } from '../field-multi-patch'
import { FieldUIState } from '../field-ui-state'
import { FieldValueState } from '../field-value-state'

export interface SelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T | null> {
  options: { label: string; value: T }[]
}

export type SelectFieldUIState = FieldUIState<IreSelectElement>

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
