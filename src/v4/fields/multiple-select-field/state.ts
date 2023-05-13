import { FieldState } from '../field-state'

export interface MultiSelectFieldState<T> extends FieldState<T[]> {
  options: { label: string; value: T }[]
}
