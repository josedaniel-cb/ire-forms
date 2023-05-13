import { FieldParams } from '../field-params'
import { MultiSelectFieldState } from './state'

export type MultiSelectFieldParams<T> = FieldParams<
  MultiSelectFieldState<T>,
  'multi-select'
>
