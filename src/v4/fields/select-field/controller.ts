import {
  FieldProps,
  FieldController,
  FieldState,
  FieldParams,
} from '../field-controller'

export interface SelectFieldState<T> extends FieldState<T> {
  options: { label: string; value: T }[]
}

export interface SelectFieldProps<T>
  extends FieldProps<T, SelectFieldState<T>> {
  readonly state: SelectFieldState<T>
}

export abstract class SelectFieldController<T> extends FieldController<
  T,
  SelectFieldState<T>
> {
  constructor(params: SelectFieldProps<T>) {
    super(params)
  }
}

export type SelectFieldParams<T> = FieldParams<SelectFieldState<T>, 'select'>
