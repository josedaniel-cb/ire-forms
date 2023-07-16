import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldValueState, FieldUIState, FieldMultiPatch } from '../field-states'

export interface SelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T | null> {
  options: { label: string; value: T }[]
}

export type SelectFieldUIState = FieldUIState

export type SelectField<T extends NonNullable<unknown>> = Field<
  T | null,
  SelectFieldValueState<T>,
  SelectFieldUIState
>

export class SelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  SelectFieldUIState
> {}

export type SelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T | null,
    'select',
    SelectFieldValueState<T>,
    SelectFieldUIState
  >

export type SelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<T | null, SelectFieldValueState<T>, SelectFieldUIState>
