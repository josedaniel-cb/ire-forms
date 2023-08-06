import { CheckboxesFieldDefinition } from '../../fields/controllers/checkboxes-controller'
import { ChipsFieldDefinition } from '../../fields/controllers/chips-controller'
import { SelectFieldDefinition } from '../../fields/controllers/native-select-controller'
import { TextFieldDefinition } from '../../fields/controllers/text-controller'
import { FormDefinition } from '../definition/form-definition'
import { FormValueState } from './form-value-state'

export type FormValue<T extends FormDefinition> = {
  readonly [K in keyof T['fields']]: T['fields'][K] extends TextFieldDefinition
    ? string
    : T['fields'][K] extends SelectFieldDefinition<infer R>
    ? R | null
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? R[]
    : T['fields'][K] extends CheckboxesFieldDefinition<infer R>
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
    : T['fields'][K] extends ChipsFieldDefinition<infer R>
    ? R[]
    : T['fields'][K] extends CheckboxesFieldDefinition<infer R>
    ? R[]
    : T['fields'][K] extends FormDefinition
    ? FormValuePatch<T['fields'][K]>
    : never
}

export class FormValueBuilder {
  static fromValueState<T extends FormDefinition>(
    valueState: FormValueState<T>,
  ): FormValue<T> {
    return Object.keys(valueState).reduce(
      (value, key) => {
        const valueStateAttr = valueState[key]
        if ('value' in valueStateAttr) {
          const fieldValueState = valueStateAttr
          // It's a leaf (field)
          value[key] = fieldValueState.value
        } else {
          // It's a branch (form or fieldset)
          // rome-ignore lint/suspicious/noExplicitAny: any is required here
          const formValueState = valueStateAttr as FormValueState<any>
          value[key] = FormValueBuilder.fromValueState(formValueState)
        }
        return value
      },
      // rome-ignore lint/suspicious/noExplicitAny: any is required here
      {} as Partial<FormValue<any>>,
    ) as FormValue<T>
  }
}
