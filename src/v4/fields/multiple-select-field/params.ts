import { FieldParams } from '../field-controller'
import { MultiSelectFieldState } from './state'

export type MultiSelectFieldParams<T> = FieldParams<
  MultiSelectFieldState<T>,
  'multi-select'
>
