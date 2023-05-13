import { FieldState } from '../field-controller'

export interface SelectFieldState<T> extends FieldState<T> {
  options: { label: string; value: T }[]
}
