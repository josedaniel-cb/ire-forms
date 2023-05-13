import { FieldState } from './field-state'

export interface MultiSelectFieldState<T> extends FieldState<T[]> {
  options: { label: string; value: T }[]
}

export interface MultiSelectField<T> {
  readonly state: MultiSelectFieldState<T>
}

export abstract class MultiSelectFieldController<T>
  implements MultiSelectField<T>
{
  readonly state: MultiSelectFieldState<T>

  constructor(params: MultiSelectField<T>) {
    this.state = params.state
  }
}

export interface MultiSelectFieldParams<T>
  extends Omit<MultiSelectFieldState<T>, 'value'> {
  type: 'multi-select'
  value?: T[]
}
