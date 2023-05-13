import {
  MultiSelectField,
  MultiSelectFieldParams,
  MultiSelectFieldState,
} from '../fields/multiple-select-field'
import {
  SelectField,
  SelectFieldParams,
  SelectFieldState,
} from '../fields/select-field'
import {
  TextField,
  TextFieldParams,
  TextFieldState,
} from '../fields/text-field'

export type FormFields<T extends FormParams> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldParams
    ? TextField
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? SelectField<R>
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? MultiSelectField<R>
    : T['fields'][K] extends FieldSet
    ? FormFields<T['fields'][K]>
    : never
}

export type FormValue<T extends FormParams> = {
  [K in keyof T['fields']]: T['fields'][K] extends TextFieldParams
    ? string
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? R[]
    : T['fields'][K] extends FieldSet
    ? FormValue<T['fields'][K]>
    : never
}

// export type FormFieldsPatch<T extends FormParams> = {
//   [K in keyof T['fields']]?: T['fields'][K] extends TextFieldParams
//     ? Partial<Omit<TextFieldParams, 'type'>>
//     : T['fields'][K] extends SelectFieldParams<infer R>
//     ? Partial<Omit<SelectFieldParams<R>, 'type'>>
//     : T['fields'][K] extends MultiSelectFieldParams<infer R>
//     ? Partial<Omit<MultiSelectFieldParams<R>, 'type'>>
//     : T['fields'][K] extends FieldSet
//     ? FormFieldsPatch<T['fields'][K]>
//     : never
// }
export type FormFieldsPatch<T extends FormParams> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldParams
    ? Partial<TextFieldState>
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? Partial<SelectFieldState<R>>
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? Partial<MultiSelectFieldState<R>>
    : T['fields'][K] extends FieldSet
    ? FormFieldsPatch<T['fields'][K]>
    : never
}

export type FormValuePatch<T extends FormParams> = {
  [K in keyof T['fields']]?: T['fields'][K] extends TextFieldParams
    ? string
    : T['fields'][K] extends SelectFieldParams<infer R>
    ? R | null
    : T['fields'][K] extends MultiSelectFieldParams<infer R>
    ? R[]
    : T['fields'][K] extends FieldSet
    ? FormValuePatch<T['fields'][K]>
    : never
}

export interface FieldSet {
  fields: FormParams['fields']
}

export type FormNode =
  | TextFieldParams
  | SelectFieldParams<unknown>
  | MultiSelectFieldParams<unknown>
  | FieldSet

export type FormParams = {
  fields: Record<string, FormNode>
}
