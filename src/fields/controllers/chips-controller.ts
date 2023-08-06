import { Icon } from '../../components/icons/icon'
import { IreChipsElement } from '../../components/stateful/chips-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { Field, FieldController } from './base/field-controller'
import {
  MultiSelectFieldValueState,
  SelectOption,
} from './multi-select/multi-select-value-state'
import { HTMLTemplateResult } from 'lit'

export interface ChipsFieldUIState<T> extends FieldUIState<IreChipsElement> {
  removeIcon?: Icon
  optionHtmlTemplateBuilder?: (
    option: SelectOption<T>,
    index: number,
  ) => HTMLTemplateResult
}

export type ChipsField<T extends NonNullable<unknown>> = Field<
  T[],
  MultiSelectFieldValueState<T>,
  IreChipsElement,
  ChipsFieldUIState<T>
>

export class ChipsFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  IreChipsElement,
  ChipsFieldUIState<T>
> {}

export type ChipsFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T[],
    'multi-select',
    MultiSelectFieldValueState<T>,
    IreChipsElement,
    ChipsFieldUIState<T>
  >

export type ChipsFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T[],
    MultiSelectFieldValueState<T>,
    IreChipsElement,
    ChipsFieldUIState<T>
  >
