import { HtmlInput } from '../../../ui/html-input'
import { Validators } from '../../../validators/validators'
import { ControlType } from '../../abstract-field'
import {
  AbstractInput,
  AbstractInputController,
  AbstractSubInputBuilderParams,
  AbstractSubInputConstructorParams,
  AbstractSubInputExternalParams,
  InputType,
} from '../abstract-input'

export interface NumberInput extends AbstractInput<number> {
  get placeholder(): string | null
  set placeholder(value: string | null)
}

export class NumberInputController
  extends AbstractInputController<number>
  implements NumberInput
{
  static readonly min = Number.MIN_SAFE_INTEGER
  static readonly max = Number.MAX_SAFE_INTEGER

  protected readonly _min: number
  protected readonly _max: number
  protected readonly _step: number
  protected readonly _fractionDigits?: number

  protected _buildingFloat = false

  constructor(params: NumberInputConstructorParams) {
    super({ ...params, type: InputType.Number })

    if (params.placeholder !== undefined) this.placeholder = params.placeholder

    // Number range
    if (
      params.min !== undefined &&
      params.max !== undefined &&
      params.min <= params.max
    ) {
      this._min = params.min
      this._max = params.max
    } else {
      this._min =
        params.min !== undefined ? params.min : NumberInputController.min
      this._max =
        params.max !== undefined ? params.max : NumberInputController.max
    }
    this._validators.push(
      Validators.numberRange({
        max: params.max,
        min: params.min,
      }),
    )

    // Keyboard arrows gap
    this._step = params.step !== undefined ? params.step : 1
    if (params.fractionDigits !== undefined && params.fractionDigits >= 0)
      this._fractionDigits = params.fractionDigits

    if (this._initialValue !== this._defaultValue) {
      this._validateAndNotify(this.value)
    }
  }

  // Html
  override connect(element: HTMLInputElement) {
    super.connect(element)

    HtmlInput.setNumberInputBehavior(element, {
      min: this._min,
      max: this._max,
      step: this._step,
      onChange: (value) => this._validateAndNotify(value),
      formatFn: (value) => this._formatValue(value),
    })

    HtmlInput.addEnterKeyListener(element, this.onFilled)

    if (this._fractionDigits !== undefined && !isNaN(this.value)) {
      element.addEventListener('focusout', () => {
        if (isNaN(this.value)) {
          element.value = ''
        } else {
          element.value = this.value.toFixed(this._fractionDigits)
        }
      })
    }
  }

  override async setValue(value: number): Promise<void> {
    if (this._fractionDigits !== undefined && !isNaN(value))
      value = Number.parseFloat(value.toFixed(this._fractionDigits))
    super.setValue(value)
  }

  protected override _isEmpty(value: number): boolean {
    return isNaN(value)
  }

  protected _getValueFromElement(element: HTMLInputElement): number {
    // Get numeric value
    let value = Number.parseFloat(element.value)

    // Clear if NaN
    if (Number.isNaN(value)) {
      element.value = ''
      return NaN
    }

    // If building float
    if (element.value.charAt(element.value.length - 1) === '.') {
      return value
    }

    if (this._fractionDigits !== undefined) {
      const decimal = value.toString().split('.')[1]
      if (decimal !== undefined) {
        if (decimal.length > this._fractionDigits) {
          element.value = value.toFixed(this._fractionDigits)
          value = Number.parseFloat(element.value)
        }
      }
    }

    return value
  }

  protected _setValueToElement(value: number, element: HTMLInputElement): void {
    element.value = this._formatValue(value)
  }

  protected _formatValue(value: number): string {
    if (isNaN(value)) {
      return ''
    }
    if (this._fractionDigits === undefined) {
      return value.toString()
    }
    return value.toFixed(this._fractionDigits)
  }

  protected _getDefaultValue(): number {
    return NaN
  }

  get placeholder(): string | null {
    return this._attributes.get('placeholder')
  }

  set placeholder(value: string | null) {
    this._attributes.set('placeholder', value)
  }
}

interface BuilderParams extends AbstractSubInputBuilderParams<number> {
  min?: number
  max?: number
  step?: number
  placeholder?: string
  fractionDigits?: number
}

interface NumberInputExternalParams
  extends BuilderParams,
    AbstractSubInputExternalParams<number> {
  controlType: 'numberInput'
}

function makeNumberInputExternalParams(
  params: BuilderParams,
): NumberInputExternalParams {
  return { ...params, controlType: 'numberInput' }
}

interface NumberInputConstructorParams
  extends BuilderParams,
    AbstractSubInputConstructorParams<number> {}

export { makeNumberInputExternalParams }
export type { NumberInputExternalParams, NumberInputConstructorParams }
