import { IreCheckboxesElement } from '../../components/stateful/checkboxes-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { Field, FieldController } from './base/field-controller'
import {
  MultiSelectFieldValueState,
  SelectOption,
} from './multi-select/multi-select-value-state'
import { HTMLTemplateResult } from 'lit'

export interface CheckboxesFieldUIState<T>
  extends FieldUIState<IreCheckboxesElement> {
  optionHtmlTemplateBuilder?: (
    option: SelectOption<T>,
    index: number,
  ) => HTMLTemplateResult
}

export type CheckboxesField<T extends NonNullable<unknown>> = Field<
  T[],
  MultiSelectFieldValueState<T>,
  IreCheckboxesElement,
  CheckboxesFieldUIState<T>
>

export class CheckboxesFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  IreCheckboxesElement,
  CheckboxesFieldUIState<T>
> {}

export type CheckboxesFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T[],
    'checkboxes',
    MultiSelectFieldValueState<T>,
    IreCheckboxesElement,
    CheckboxesFieldUIState<T>
  >

export type CheckboxesFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T[],
    MultiSelectFieldValueState<T>,
    IreCheckboxesElement,
    CheckboxesFieldUIState<T>
  >
