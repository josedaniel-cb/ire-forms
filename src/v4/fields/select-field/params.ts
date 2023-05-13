import { FieldParams } from '../field-params'
import { SelectFieldState } from './state'

export type SelectFieldParams<T> = FieldParams<
  SelectFieldState<T>,
  'multi-select'
>
