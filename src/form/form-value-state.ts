import {
  MultiSelectFieldDefinition,
  MultiSelectFieldValueState,
} from '../fields/multiple-select-field/controller'
import {
  SelectFieldDefinition,
  SelectFieldValueState,
} from '../fields/select-field/controller'
import {
  TextFieldDefinition,
  TextFieldValueState,
} from '../fields/text-field/controller'
import { FormDefinition } from './form-definition'

export type FormValueState<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? TextFieldValueState
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectFieldValueState<R>
    : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
    ? MultiSelectFieldValueState<R>
    : T['fields'][K] extends FormDefinition
    ? FormValueState<T['fields'][K]>
    : never
}

// export type FormValueStatePatch<T extends FormDefinition> = {
//   [K in keyof T['fields']]?: T['fields'][K] extends TextFieldDefinition
//     ? string
//     : T['fields'][K] extends SelectFieldDefinition<infer R>
//     ? R | null
//     : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
//     ? R[]
//     : T['fields'][K] extends FormDefinition
//     ? FormValueStatePatch<T['fields'][K]>
//     : never
// }
