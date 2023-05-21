import {
  MultiSelectFieldBuilderParams,
  MultiSelectFieldProps,
  MultiSelectFieldState,
} from '../fields/multiple-select-field/controller'
import {
  SelectFieldBuilderParams,
  SelectFieldProps,
  SelectFieldState,
} from '../fields/select-field/controller'
import {
  TextFieldBuilderParams,
  TextFieldProps,
  TextFieldState,
} from '../fields/text-field/controller'
import { FormDefinition } from './form-definition'

export type FormFields<T extends FormDefinition> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldBuilderParams
    ? TextFieldProps
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? SelectFieldProps<R>
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? MultiSelectFieldProps<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]>
    : never
}

export type FormValue<T extends FormDefinition> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldBuilderParams
    ? string
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValue<T['fields'][K]>
    : never
}

export type FormFieldsPatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldBuilderParams
    ? Partial<TextFieldState>
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? Partial<SelectFieldState<R>>
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? Partial<MultiSelectFieldState<R>>
    : T['fields'][K] extends FormDefinition
    ? FormFieldsPatch<T['fields'][K]>
    : never
}

export type FormValuePatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldBuilderParams
    ? string
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValuePatch<T['fields'][K]>
    : never
}
