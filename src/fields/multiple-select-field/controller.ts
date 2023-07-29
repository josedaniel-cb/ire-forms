import { IreMultiSelectElement } from '../../components/stateful/multiple-select-element'
import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldMultiPatch } from '../field-multi-patch'
import { FieldUIState } from '../field-ui-state'
import { FieldValueState } from '../field-value-state'

export interface MultiSelectFieldValueState<T extends NonNullable<unknown>>
  extends FieldValueState<T[]> {
  options: { label: string; value: T }[]
}

export type MultiSelectFieldUIState = FieldUIState<IreMultiSelectElement>

export type MultiSelectField<T extends NonNullable<unknown>> = Field<
  T[],
  MultiSelectFieldValueState<T>,
  IreMultiSelectElement,
  MultiSelectFieldUIState
>

export class MultiSelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  IreMultiSelectElement,
  MultiSelectFieldUIState
> {}

export type MultiSelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T[],
    'multi-select',
    MultiSelectFieldValueState<T>,
    IreMultiSelectElement,
    MultiSelectFieldUIState
  >

export type MultiSelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T[],
    MultiSelectFieldValueState<T>,
    IreMultiSelectElement,
    MultiSelectFieldUIState
  >
