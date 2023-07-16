import { FieldUIState, FieldValueState } from './field-states'
import { FieldType } from './field-type'
import { FieldValidationFn } from './field-validator'

type NullableKeys<T> = {
  [K in keyof T]: null extends T[K] ? K : never
}[keyof T]
type MakeNullablePropertiesUndefined<T> = Omit<T, NullableKeys<T>> &
  Partial<{ [K in NullableKeys<T>]: Exclude<T[K], null> | undefined }>

export type FieldDefinition<
  T,
  K extends FieldType,
  V extends FieldValueState<T>,
  U extends FieldUIState,
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
    onValueChange?(value: T): void
    onRender?(htmlElement: HTMLElement): void
  }
