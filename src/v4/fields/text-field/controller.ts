import { Field } from '../field'
import { TextFieldState } from './state'

export interface TextField extends Field<string> {
  readonly state: TextFieldState
}

export abstract class TextFieldController implements TextField {
  readonly state: TextFieldState

  constructor(params: TextField) {
    this.state = params.state
  }
}
