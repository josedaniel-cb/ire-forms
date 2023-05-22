import {
  TextFieldDefinition,
  TextField,
  TextFieldMultiPatch,
} from '../fields/text-field/controller'
import {
  SelectFieldDefinition,
  SelectField,
  SelectFieldMultiPatch,
} from '../fields/select-field/controller'
import {
  MultiSelectFieldDefinition,
  MultiSelectField,
  MultiSelectFieldMultiPatch,
} from '../fields/multiple-select-field/controller'
import { FormDefinition } from './form-definition'

export type FormFields<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? TextField
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectField<R>
    : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
    ? MultiSelectField<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]> //  ?  FormProps<T['fields'][K]>
    : never
}

export type FormFieldsPatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldDefinition
    ? TextFieldMultiPatch
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectFieldMultiPatch<R>
    : T['fields'][K] extends MultiSelectFieldDefinition<infer R>
    ? MultiSelectFieldMultiPatch<R>
    : T['fields'][K] extends FormDefinition
    ? FormFieldsPatch<T['fields'][K]>
    : never
}
