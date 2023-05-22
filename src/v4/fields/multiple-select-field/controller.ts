import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldValueState, FieldUIState, FieldMultiPatch } from '../field-states'

export interface MultiSelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T[]> {
  options: { label: string; value: T }[]
}

export type MultiSelectFieldUIState = FieldUIState

export type MultiSelectField<T extends NonNullable<unknown>> = Field<
  T[],
  MultiSelectFieldValueState<T>,
  MultiSelectFieldUIState
>

export class MultiSelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  MultiSelectFieldUIState
> {}

export type MultiSelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T[],
    'multi-select',
    MultiSelectFieldValueState<T>,
    MultiSelectFieldUIState
  >

export type MultiSelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<T[], MultiSelectFieldValueState<T>, MultiSelectFieldUIState>
