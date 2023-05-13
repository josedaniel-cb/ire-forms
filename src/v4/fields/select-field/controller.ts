import { FieldProps, FieldController } from '../field-controller'
import { SelectFieldState } from './state'

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
