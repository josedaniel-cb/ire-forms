import { FieldProps, FieldController, FieldParams } from '../field-controller'
import { FieldState } from '../field-controller'

export interface MultiSelectFieldState<T> extends FieldState<T[]> {
  options: { label: string; value: T }[]
}

export interface MultiSelectFieldProps<T>
  extends FieldProps<T[], MultiSelectFieldState<T>> {
  readonly state: MultiSelectFieldState<T>
}

export abstract class MultiSelectFieldController<T> extends FieldController<
  T[],
  MultiSelectFieldState<T>
> {
  constructor(params: MultiSelectFieldProps<T>) {
    super(params)
  }
}

export type MultiSelectFieldParams<T> = FieldParams<
  MultiSelectFieldState<T>,
  'multi-select'
>
