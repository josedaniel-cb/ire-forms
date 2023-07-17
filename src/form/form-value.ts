import { TextFieldDefinition } from '../fields/text-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { FormDefinition } from './form-definition'
import { FormValueState } from './form-value-state'

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
// TODO: TEST THIS
// export type FormValuePatch<T extends FormDefinition> = Partial<FormValue<T>>

export class FormValueBuilder {
  static fromValueState<T extends FormDefinition>(
    valueState: FormValueState<T>,
  ): FormValue<T> {
    return Object.keys(valueState).reduce(
      (value, key) => {
        value[key] = valueState[key].value
        return value
      },
      // rome-ignore lint/suspicious/noExplicitAny: any is required here
      {} as Partial<FormValue<any>>,
    ) as FormValue<T>
  }
}
