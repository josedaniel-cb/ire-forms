import {
  FieldProps,
  FieldController,
  FieldBuilderParams,
} from '../field-controller'
import { FieldState } from '../field-state'

export interface SelectFieldState<T> extends FieldState<NonNullable<T> | null> {
  options: { label: string; value: NonNullable<T> }[]
}

export type SelectFieldProps<T> = FieldProps<
  NonNullable<T> | null,
  SelectFieldState<T>
>

export class SelectFieldController<T> extends FieldController<
  NonNullable<T> | null,
  SelectFieldState<T>
> {}

export type SelectFieldBuilderParams<T> = FieldBuilderParams<
  NonNullable<T> | null,
  SelectFieldState<T>,
  'select'
>
