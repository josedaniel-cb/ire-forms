import { FieldState } from '../field-state'

export interface SelectFieldState<T> extends FieldState<T> {
  options: { label: string; value: T }[]
}
