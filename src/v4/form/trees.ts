import {
  MultiSelectFieldParams,
  MultiSelectFieldProps,
  MultiSelectFieldState,
} from '../fields/multiple-select-field/controller'
import {
  SelectFieldParams,
  SelectFieldProps,
  SelectFieldState,
} from '../fields/select-field/controller'
import {
  TextFieldParams,
  TextFieldProps,
  TextFieldState,
} from '../fields/text-field/controller'
import { FormDefinition } from './form-definition'

export type FormFields<T extends FormDefinition> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldParams
    ? TextFieldProps
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? SelectFieldProps<R>
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? MultiSelectFieldProps<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]>
    : never
}

export type FormValue<T extends FormDefinition> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldParams
    ? string
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValue<T['fields'][K]>
    : never
}

export type FormFieldsPatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldParams
    ? Partial<TextFieldState>
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? Partial<SelectFieldState<R>>
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? Partial<MultiSelectFieldState<R>>
    : T['fields'][K] extends FormDefinition
    ? FormFieldsPatch<T['fields'][K]>
    : never
}

export type FormValuePatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldParams
    ? string
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValuePatch<T['fields'][K]>
    : never
}
