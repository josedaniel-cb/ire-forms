import { FieldState } from './field-state'

export interface SelectFieldState<T> extends FieldState<T> {
  options: { label: string; value: T }[]
}

export interface SelectField<T> {
  readonly state: SelectFieldState<T>
}

export abstract class SelectFieldController<T> implements SelectField<T> {
  readonly state: SelectFieldState<T>

  constructor(params: SelectField<T>) {
    this.state = params.state
  }
}

export interface SelectFieldParams<T>
  extends Omit<SelectFieldState<T>, 'value'> {
  type: 'select'
  value?: T
}
