import {
  FieldProps,
  FieldController,
  FieldBuilderParams,
} from '../field-controller'
import { FieldState } from '../field-state'

export interface MultiSelectFieldState<T> extends FieldState<T[]> {
  options: { label: string; value: T }[]
}

export type MultiSelectFieldProps<T> = FieldProps<T[], MultiSelectFieldState<T>>

export class MultiSelectFieldController<T> extends FieldController<
  T[],
  MultiSelectFieldState<T>
> {}

export type MultiSelectFieldBuilderParams<T> = FieldBuilderParams<
  T[],
  MultiSelectFieldState<T>,
  'multi-select'
>
