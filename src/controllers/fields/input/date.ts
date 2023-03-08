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

export interface DateInput extends AbstractInput<Date | null> {
  get placeholder(): string | null
  set placeholder(value: string | null)
  get min(): string | null
  set min(value: string | null)
  get max(): string | null
  set max(value: string | null)
  get step(): number | null
  set step(value: number | null)
}

export class DateInputController
  extends AbstractInputController<Date | null>
  implements DateInput
{
  constructor(params: DateInputConstructorParams) {
    super({ ...params, type: InputType.Date })

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

  protected _getValueFromElement(element: HTMLInputElement): Date | null {
    return element.valueAsDate
  }

  protected _setValueToElement(
    value: Date | null,
    element: HTMLInputElement
  ): void {
    if (value !== null) {
      element.value = value.toISOString().substring(0, 10)
    } else {
      element.value = ''
    }
  }

  protected _getDefaultValue(): Date | null {
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

interface BuilderParams extends AbstractSubInputBuilderParams<Date | null> {
  /**
   * YYYY-MM-DD
   */
  min?: string
  /**
   * YYYY-MM-DD
   */
  max?: string
  step?: number
  placeholder?: string
}

interface DateInputExternalParams
  extends BuilderParams,
    AbstractSubInputExternalParams<Date | null> {
  controlType: 'dateInput'
}

function makeDateInputExternalParams(
  params: BuilderParams
): DateInputExternalParams {
  return { ...params, controlType: 'dateInput' }
}

interface DateInputConstructorParams
  extends BuilderParams,
    AbstractSubInputConstructorParams<Date | null> {}

export { makeDateInputExternalParams }
export type { DateInputExternalParams, DateInputConstructorParams }
