import { TextFieldDefinition } from '../fields/text-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { FormDefinition } from './form-definition'

export type FormValue<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? string
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValue<T['fields'][K]>
    : never
}

export type FormValuePatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldDefinition
    ? string
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValuePatch<T['fields'][K]>
    : never
}
