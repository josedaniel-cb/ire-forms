import {
  FieldProps,
  FieldController,
  FieldState,
  FieldParams,
} from '../field-controller'

export interface SelectFieldState<T> extends FieldState<NonNullable<T> | null> {
  options: { label: string; value: NonNullable<T> }[]
}

export interface SelectFieldProps<T>
  extends FieldProps<NonNullable<T> | null, SelectFieldState<T>> {
  readonly state: SelectFieldState<T>
}

export abstract class SelectFieldController<T> extends FieldController<
  NonNullable<T> | null,
  SelectFieldState<T>
> {
  constructor(params: SelectFieldProps<T>) {
    super(params)
  }
}

export type SelectFieldParams<T> = FieldParams<SelectFieldState<T>, 'select'>
