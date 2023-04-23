import { ControlType } from '../../../abstract-field'
import { InputType } from '../../abstract-input'
import {
  AbstractTextInput,
  AbstractTextInputBuilderParams,
  AbstractTextInputConstructorParams,
  AbstractTextInputController,
  AbstractTextInputExternalParams,
} from '../abstract-text'

export interface PasswordInput extends AbstractTextInput {}

export class PasswordInputController
  extends AbstractTextInputController
  implements PasswordInput
{
  constructor(params: PasswordInputConstructorParams) {
    super({ ...params, type: InputType.Password })
  }
}

interface BuilderParams extends AbstractTextInputBuilderParams {}

interface PasswordInputExternalParams
  extends BuilderParams,
    AbstractTextInputExternalParams {
  controlType: 'passwordInput'
}

function makePasswordInputExternalParams(
  params: BuilderParams,
): PasswordInputExternalParams {
  return { ...params, controlType: 'passwordInput' }
}

interface PasswordInputConstructorParams
  extends BuilderParams,
    Omit<AbstractTextInputConstructorParams, 'type'> {}

export { makePasswordInputExternalParams }
export type { PasswordInputExternalParams, PasswordInputConstructorParams }
