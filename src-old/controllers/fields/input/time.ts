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

export interface TimeInput extends AbstractInput<string | null> {
  get placeholder(): string | null
  set placeholder(value: string | null)
  get min(): string | null
  set min(value: string | null)
  get max(): string | null
  set max(value: string | null)
  get step(): number | null
  set step(value: number | null)
}

export class TimeInputController
  extends AbstractInputController<string | null>
  implements TimeInput
{
  constructor(params: TimeInputConstructorParams) {
    super({ ...params, type: InputType.Time })

    if (params.min !== undefined) this.min = params.min
    if (params.max !== undefined) this.max = params.max
    if (params.step !== undefined) this.step = params.step
    if (params.placeholder !== undefined) this.placeholder = params.placeholder
  }

  // Html
  override connect(element: HTMLInputElement) {
    super.connect(element)
    element.addEventListener('focus', () => element.showPicker())
    HtmlInput.addEnterKeyListener(element, this.onFilled)
  }

  protected _getValueFromElement(element: HTMLInputElement): string | null {
    return element.value !== '' ? element.value : null
  }

  protected _setValueToElement(
    value: string | null,
    element: HTMLInputElement,
  ): void {
    if (value !== null) {
      element.value = value
    } else {
      element.value = ''
    }
  }

  protected _getDefaultValue(): string | null {
    return null
  }

  get placeholder(): string | null {
    return this._attributes.get('placeholder')
  }

  set placeholder(value: string | null) {
    this._attributes.set('placeholder', value)
  }

  get min(): string | null {
    return this._attributes.get('min')
  }

  set min(value: string | null) {
    this._attributes.set('min', value)
  }

  get max(): string | null {
    return this._attributes.get('max')
  }

  set max(value: string | null) {
    this._attributes.set('max', value)
  }

  get step(): number | null {
    return this._attributes.getNumber('step')
  }

  set step(value: number | null) {
    this._attributes.setNumber('step', value)
  }
}

interface BuilderParams extends AbstractSubInputBuilderParams<string | null> {
  /**
   * HH:mm
   */
  value?: string | null
  /**
   * HH:mm
   */
  min?: string
  /**
   * HH:mm
   */
  max?: string
  step?: number
  placeholder?: string
}

interface TimeInputExternalParams
  extends BuilderParams,
    AbstractSubInputExternalParams<string | null> {
  controlType: 'timeInput'
}

function makeTimeInputExternalParams(
  params: BuilderParams,
): TimeInputExternalParams {
  return { ...params, controlType: 'timeInput' }
}

interface TimeInputConstructorParams
  extends BuilderParams,
    AbstractSubInputConstructorParams<string | null> {}

export { makeTimeInputExternalParams }
export type { TimeInputExternalParams, TimeInputConstructorParams }
