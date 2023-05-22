import {
  TextFieldBuilderParams,
  TextFieldProps,
  TextFieldMultiPatch,
} from '../fields/text-field/controller'
import {
  SelectFieldBuilderParams,
  SelectFieldProps,
  SelectFieldMultiPatch,
} from '../fields/select-field/controller'
import {
  MultiSelectFieldBuilderParams,
  MultiSelectFieldProps,
  MultiSelectFieldMultiPatch,
} from '../fields/multiple-select-field/controller'
import { FormDefinition } from './form-definition'

export type FormFields<T extends FormDefinition> = {
  readonly [K in
    keyof T['fields']]: T['fields'][K] extends TextFieldBuilderParams
    ? TextFieldProps
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? SelectFieldProps<R>
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? MultiSelectFieldProps<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]> //  ?  FormProps<T['fields'][K]>
    : never
}

export type FormValue<T extends FormDefinition> = {
  readonly [K in
    keyof T['fields']]: T['fields'][K] extends TextFieldBuilderParams
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
    ? TextFieldMultiPatch
    : T['fields'][K] extends SelectFieldBuilderParams<infer R>
    ? SelectFieldMultiPatch<R>
    : T['fields'][K] extends MultiSelectFieldBuilderParams<infer R>
    ? MultiSelectFieldMultiPatch<R>
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
