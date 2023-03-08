import { BehaviorSubject } from 'rxjs'
import { REQUIRED_FIELD_MESSAGE } from '../../validators/messages'
import {
  AbstractFieldController,
  AbstractFieldBuilderParams,
  AbstractFieldConstructorParams,
  AbstractFieldExternalParams,
  ControlType,
  AbstractField,
} from '../abstract-field'
import { FieldState, FieldValidity } from '../../core/states'

export interface TextArea extends AbstractField<string, HTMLTextAreaElement> {
  get cols(): number | null
  set cols(value: number | null)
  get rows(): number | null
  set rows(value: number | null)
  get minlength(): number | null
  set minlength(value: number | null)
  get maxlength(): number | null
  set maxlength(value: number | null)
  get placeholder(): string | null
  set placeholder(value: string | null)
  get spellcheck(): string | null
  set spellcheck(value: string | null)
  get wrap(): string | null
  set wrap(value: string | null)
}

export class TextAreaController
  extends AbstractFieldController<string, HTMLTextAreaElement>
  implements TextArea
{
  // Value
  protected readonly _defaultValue: string = ''

  protected readonly _initialValue: string

  // State
  protected readonly _stateNotifier: BehaviorSubject<FieldState<string>>

  constructor(params: TextAreaConstructorParams) {
    super(params)

    // Value
    this._initialValue =
      params.value !== undefined ? params.value : this._defaultValue
    const validity = this._validate(this._initialValue)
    this._stateNotifier = new BehaviorSubject<FieldState<string>>({
      value: this._initialValue,
      ...validity,
      touched: false,
    })
    if (params.onStateChange !== undefined)
      this.stateChanges.subscribe(params.onStateChange)
    if (params.onValueChange !== undefined)
      this.valueChanges.subscribe(params.onValueChange)
    if (params.onValidityChange !== undefined)
      this.validityChanges.subscribe(params.onValidityChange)

    // Mutable attributes
    if (params.cols !== undefined) this.cols = params.cols
    if (params.rows !== undefined) this.rows = params.rows
    if (params.minlength !== undefined) this.minlength = params.minlength
    if (params.maxlength !== undefined) this.maxlength = params.maxlength
    if (params.placeholder !== undefined) this.placeholder = params.placeholder
    if (params.spellcheck !== undefined) this.spellcheck = params.spellcheck
    if (params.wrap !== undefined) this.wrap = params.wrap
  }

  // Html
  override connect(element: HTMLTextAreaElement) {
    super.connect(element)

    // Initialize value
    this._setValueToElement(this.value, element)

    // Subscribe to user changes
    element.addEventListener('input', () => {
      const value = this._getValueFromElement(element)
      this._validateAndNotify(value)
    })

    // Manage validity
    element.addEventListener('focusout', () => {
      this.markAsTouched()
      this._stateNotifier.next(this.state)
    })
  }

  protected _getValueFromElement(element: HTMLTextAreaElement): string {
    return element.value
  }

  protected _setValueToElement(
    value: string,
    element: HTMLTextAreaElement
  ): void {
    element.value = value
  }

  // Value
  async setValue(value: string): Promise<void> {
    this._setValueToElement(value, await this.elementAsync)
    this._validateAndNotify(value)
  }

  // Validity
  protected _validate(value: string): FieldValidity {
    const isEmpty = (value: string): boolean => value === this._defaultValue
    const checkValidity = (value: string): string[] => {
      const invalidInputMessages: string[] = []
      if (this.required && isEmpty(value))
        invalidInputMessages.push(REQUIRED_FIELD_MESSAGE)
      for (let i = 0; i < this._validators.length; i++)
        if (!this._validators[i].validationFn(value))
          invalidInputMessages.push(this._validators[i].message)
      return invalidInputMessages
    }

    const invalidStateMessages = checkValidity(value)

    return {
      invalidStateMessages,
      isValid: invalidStateMessages.length === 0,
    }
  }

  protected _validateAndNotify(value: string) {
    const validity = this._validate(value)
    this._stateNotifier.next({
      ...this.state,
      ...validity,
      value,
    })
  }

  // General
  override reset(): void {
    super.reset()
    this.value = this._initialValue
  }

  override clean(): void {
    super.clean()
    this.value = this._defaultValue
  }

  // Mutable attributes
  get cols(): number | null {
    return this._attributes.getNumber('cols')
  }

  set cols(value: number | null) {
    this._attributes.setNumber('cols', value)
  }

  get rows(): number | null {
    return this._attributes.getNumber('rows')
  }

  set rows(value: number | null) {
    this._attributes.setNumber('rows', value)
  }

  get minlength(): number | null {
    return this._attributes.getNumber('minlength')
  }

  set minlength(value: number | null) {
    this._attributes.setNumber('minlength', value)
  }

  get maxlength(): number | null {
    return this._attributes.getNumber('maxlength')
  }

  set maxlength(value: number | null) {
    this._attributes.setNumber('maxlength', value)
  }

  get placeholder(): string | null {
    return this._attributes.get('placeholder')
  }

  set placeholder(value: string | null) {
    this._attributes.set('placeholder', value)
  }

  get spellcheck(): string | null {
    return this._attributes.get('spellcheck')
  }

  set spellcheck(value: string | null) {
    this._attributes.set('spellcheck', value)
  }

  get wrap(): string | null {
    return this._attributes.get('wrap')
  }

  set wrap(value: string | null) {
    this._attributes.set('wrap', value)
  }
}

interface BuilderParams
  extends AbstractFieldBuilderParams<string, HTMLTextAreaElement> {
  value?: string
  cols?: number
  rows?: number
  minlength?: number
  maxlength?: number
  placeholder?: string
  spellcheck?: 'checked' | 'false'
  wrap?: 'hard' | 'soft'
}

interface TextAreaExternalParams
  extends BuilderParams,
    AbstractFieldExternalParams<string, HTMLTextAreaElement> {
  controlType: 'textArea'
}

function makeTextAreaExternalParams(
  params: BuilderParams
): TextAreaExternalParams {
  return { ...params, controlType: 'textArea' }
}

interface TextAreaConstructorParams
  extends BuilderParams,
    AbstractFieldConstructorParams<string, HTMLTextAreaElement> {}

export { makeTextAreaExternalParams }
export type { TextAreaExternalParams, TextAreaConstructorParams }
