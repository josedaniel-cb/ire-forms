import { FieldState } from '../field-controller'

export interface MultiSelectFieldState<T> extends FieldState<T[]> {
  options: { label: string; value: T }[]
}
