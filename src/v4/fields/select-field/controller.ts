import { Field } from '../field'
import { SelectFieldState } from './state'

export interface SelectField<T> extends Field<T> {
  readonly state: SelectFieldState<T>
}

export abstract class SelectFieldController<T> implements SelectField<T> {
  readonly state: SelectFieldState<T>

  constructor(params: SelectField<T>) {
    this.state = params.state
  }
}
