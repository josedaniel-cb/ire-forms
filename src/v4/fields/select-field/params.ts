import { FieldParams } from '../field-controller'
import { SelectFieldState } from './state'

export type SelectFieldParams<T> = FieldParams<SelectFieldState<T>, 'select'>
