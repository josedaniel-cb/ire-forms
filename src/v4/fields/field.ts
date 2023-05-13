import { FieldState } from './field-state'

export type FieldType = 'text' | 'select' | 'multi-select'

export interface Field<T> {
  readonly state: FieldState<T>
}
