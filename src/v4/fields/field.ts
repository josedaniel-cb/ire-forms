import { FieldState } from './field-state'

export interface Field<T> {
  readonly state: FieldState<T>
}
