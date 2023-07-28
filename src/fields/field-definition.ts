import { FieldElement } from '../components/stateful/base/field-element'
import { Field } from './field-controller'
import { FieldType } from './field-type'
import { FieldUIState } from './field-ui-state'
import { FieldValidationFn, FieldValidationResult } from './field-validator'
import { ExternalFieldValueState, FieldValueState } from './field-value-state'

type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never
}[keyof T]
type MakeNullablePropertiesUndefined<T> = Omit<T, NullableKeys<T>> &
  Partial<{ [K in NullableKeys<T>]: Exclude<T[K], null> | undefined }>

export type FieldDefinition<
  T,
  K extends FieldType,
  V extends FieldValueState<T>,
  E extends FieldElement,
  U extends FieldUIState<E>,
> = MakeNullablePropertiesUndefined<
  Omit<V, 'value' | 'validationResult' | 'enabled'>
> &
  MakeNullablePropertiesUndefined<Omit<U, 'htmlElement' | 'touched'>> & {
    type: K
    required?: boolean
    validators?: FieldValidationFn<T>[]

    // Value state
    value?: V['value']
    enabled?: boolean

    // Subscriptions
    onValueStateChange?: (
      valueState: ExternalFieldValueState<T, V>,
      field: Field<T, V, E, U>,
    ) => void
    onValueChange?: (value: T, field: Field<T, V, E, U>) => void
    onValidation?: (
      validation: FieldValidationResult,
      field: Field<T, V, E, U>,
    ) => void
    onUiStateChange?: (uiState: U, field: Field<T, V, E, U>) => void
    onRender?: (el: E, field: Field<T, V, E, U>) => void
  }
