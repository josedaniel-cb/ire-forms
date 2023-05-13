import { FieldProps, FieldController } from '../field-controller'
import { MultiSelectFieldState } from './state'

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
