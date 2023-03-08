import { ControlType } from '../../../abstract-field'
import { InputType } from '../../abstract-input'
import {
  AbstractTextInput,
  AbstractTextInputBuilderParams,
  AbstractTextInputConstructorParams,
  AbstractTextInputController,
  AbstractTextInputExternalParams,
} from '../abstract-text'

export interface TextInput extends AbstractTextInput {
  upperCaseOnly: boolean
}

export class TextInputController
  extends AbstractTextInputController
  implements TextInput
{
  readonly upperCaseOnly: boolean

  constructor(params: TextInputConstructorParams) {
    super({ ...params, type: InputType.Text })

    this.upperCaseOnly = params.upperCaseOnly ?? false
  }
}

interface TextInputBuilderParams extends AbstractTextInputBuilderParams {
  upperCaseOnly?: boolean
}

interface TextInputExternalParams
  extends TextInputBuilderParams,
    AbstractTextInputExternalParams {
  controlType: 'textInput'
}

function makeTextInputExternalParams(
  params: TextInputBuilderParams
): TextInputExternalParams {
  return { ...params, controlType: 'textInput' }
}

interface TextInputConstructorParams
  extends TextInputBuilderParams,
    Omit<AbstractTextInputConstructorParams, 'type'> {}

export { makeTextInputExternalParams }
export type {
  TextInputBuilderParams,
  TextInputExternalParams,
  TextInputConstructorParams,
}
