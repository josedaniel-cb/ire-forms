import { Icon } from '../../components/icons/icon'
import { IreRadiosElement } from '../../components/stateful/radios-element'
import { FormUILayout } from '../../form-ui/form-ui-layout'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { Field, FieldController } from './base/field-controller'
import { SelectOption } from './multi-select/multi-select-value-state'
import { SelectFieldValueState } from './select/select-value-state'
import { HTMLTemplateResult } from 'lit'

export interface RadiosFieldUIState<T> extends FieldUIState<IreRadiosElement> {
  layout: FormUILayout | null
  optionHtmlTemplateBuilder?: (
    option: SelectOption<T>,
    index: number,
  ) => HTMLTemplateResult
}

export type RadiosField<T extends NonNullable<unknown>> = Field<
  T | null,
  SelectFieldValueState<T>,
  IreRadiosElement,
  RadiosFieldUIState<T>
>

export class RadiosFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  IreRadiosElement,
  RadiosFieldUIState<T>
> {}

export type RadiosFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T | null,
    'radios',
    SelectFieldValueState<T>,
    IreRadiosElement,
    RadiosFieldUIState<T>
  >

export type RadiosFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T | null,
    SelectFieldValueState<T>,
    IreRadiosElement,
    RadiosFieldUIState<T>
  >
