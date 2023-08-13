import {
  CheckboxesField,
  CheckboxesFieldDefinition,
  CheckboxesFieldMultiPatch,
} from '../../fields/controllers/checkboxes-controller'
import {
  ChipsField,
  ChipsFieldDefinition,
  ChipsFieldMultiPatch,
} from '../../fields/controllers/chips-controller'
import {
  NativeSelectField,
  NativeSelectFieldDefinition,
  NativeSelectFieldMultiPatch,
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
    : T['fields'][K] extends NativeSelectFieldDefinition<infer R>
    ? NativeSelectField<R>
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? ChipsField<R>
    : T['fields'][K] extends CheckboxesFieldDefinition<infer R>
    ? CheckboxesField<R>
    : T['fields'][K] extends FormDefinition
    ? FormFields<T['fields'][K]> //  ?  FormProps<T['fields'][K]>
    : never
}

export type FormFieldsPatch<T extends FormDefinition> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldDefinition
    ? TextFieldMultiPatch
    : T['fields'][K] extends NativeSelectFieldDefinition<infer R>
    ? NativeSelectFieldMultiPatch<R>
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? ChipsFieldMultiPatch<R>
    : T['fields'][K] extends CheckboxesFieldDefinition<infer R>
    ? CheckboxesFieldMultiPatch<R>
    : T['fields'][K] extends FormDefinition
    ? FormFieldsPatch<T['fields'][K]>
    : never
}
