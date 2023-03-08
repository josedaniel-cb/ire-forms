import { HtmlInput } from '../../../ui/html-input'
import { ControlType } from '../../abstract-field'
import {
  AbstractInput,
  AbstractInputController,
  AbstractSubInputBuilderParams,
  AbstractSubInputConstructorParams,
  AbstractSubInputExternalParams,
  InputType,
} from '../abstract-input'

export interface CheckboxInput extends AbstractInput<boolean> {}

export class CheckboxInputController
  extends AbstractInputController<boolean>
  implements CheckboxInput
{
  constructor(params: CheckboxInputConstructorParams) {
    super({
      ...params,
      required: params.required !== undefined ? params.required : false,
      type: InputType.Checkbox,
    })
  }

  override connect(element: HTMLInputElement) {
    super.connect(element)
    HtmlInput.addEnterKeyListener(element, this.onFilled)
    element.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        this.setValue(!this.value)
      }
    })
  }

  protected override _isEmpty(value: boolean): boolean {
    return !value
  }

  protected _getValueFromElement(element: HTMLInputElement): boolean {
    return element.checked
  }

  protected _setValueToElement(
    value: boolean,
    element: HTMLInputElement
  ): void {
    element.checked = value
  }

  protected _getDefaultValue(): boolean {
    return false
  }
}

interface BuilderParams extends AbstractSubInputBuilderParams<boolean> {}

interface CheckboxInputExternalParams
  extends BuilderParams,
    AbstractSubInputExternalParams<boolean> {
  controlType: 'checkboxInput'
}

function makeCheckboxInputExternalParams(
  params: BuilderParams
): CheckboxInputExternalParams {
  return { ...params, controlType: 'checkboxInput' }
}

interface CheckboxInputConstructorParams
  extends BuilderParams,
    AbstractSubInputConstructorParams<boolean> {}

export { makeCheckboxInputExternalParams }
export type { CheckboxInputExternalParams, CheckboxInputConstructorParams }
