import { CheckboxesFieldDefinition } from '../../fields/controllers/checkboxes-controller'
import { ChipsFieldDefinition } from '../../fields/controllers/chips-controller'
import { MultiSelectFieldValueState } from '../../fields/controllers/multi-select/multi-select-value-state'
import { SelectFieldDefinition } from '../../fields/controllers/native-select-controller'
import { SelectFieldValueState } from '../../fields/controllers/select/select-value-state'
import {
  TextFieldDefinition,
  TextFieldValueState,
} from '../../fields/controllers/text-controller'
import { FormDefinition } from '../definition/form-definition'

export type FormValueState<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? TextFieldValueState
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectFieldValueState<R>
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? MultiSelectFieldValueState<R>
    : T['fields'][K] extends CheckboxesFieldDefinition<infer R>
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
