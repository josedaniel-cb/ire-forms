import { Field } from '../field'
import { MultiSelectFieldState } from './state'

export interface MultiSelectField<T> extends Field<T[]> {
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
