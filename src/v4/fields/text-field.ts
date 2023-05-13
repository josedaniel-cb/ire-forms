import { FieldState } from './field-state'

export type TextFieldState = FieldState<string>

export interface TextField {
  readonly state: TextFieldState
}

export abstract class TextFieldController implements TextField {
  readonly state: TextFieldState

  constructor(params: TextField) {
    this.state = params.state
  }
}

export interface TextFieldParams extends Omit<TextFieldState, 'value'> {
  type: 'text'
  value?: string
}
