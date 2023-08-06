import {
  ChipsField,
  ChipsFieldDefinition,
  ChipsFieldMultiPatch,
} from '../../fields/controllers/chips-controller'
import {
  SelectField,
  SelectFieldDefinition,
  SelectFieldMultiPatch,
} from '../../fields/controllers/native-select-controller'
import {
  TextField,
  TextFieldDefinition,
  TextFieldMultiPatch,
} from '../../fields/controllers/text-controller'
import { FormDefinition } from '../definition/form-definition'

export type FormFields<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? TextField
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectField<R>
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? ChipsField<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]> //  ?  FormProps<T['fields'][K]>
    : never
}

export type FormFieldsPatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldDefinition
    ? TextFieldMultiPatch
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? SelectFieldMultiPatch<R>
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? ChipsFieldMultiPatch<R>
    : T['fields'][K] extends FormDefinition
    ? FormFieldsPatch<T['fields'][K]>
    : never
}
