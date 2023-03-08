import { BehaviorSubject } from 'rxjs'
import { REQUIRED_FIELD_MESSAGE } from '../../validators/messages'
import {
  AbstractFieldController,
  AbstractFieldBuilderParams,
  AbstractFieldConstructorParams,
  AbstractFieldExternalParams,
  AbstractField,
} from '../abstract-field'
import { FieldState, FieldValidity } from '../../core/states'

export interface AbstractInput<T> extends AbstractField<T, HTMLInputElement> {}

export abstract class AbstractInputController<T = NonNullable<any> | null>
  extends AbstractFieldController<T, HTMLInputElement>
  implements AbstractInput<T>
{
  // Inmutable attributes
  readonly type: InputType

  // Value
  protected readonly _defaultValue: T

  protected readonly _initialValue: T

  // State
  protected readonly _stateNotifier: BehaviorSubject<FieldState<T>>

  constructor(params: AbstractInputConstructorParams<T>) {
    super(params)

    // Inmutable attributes
    this.type = params.type

    // Value
    this._defaultValue = this._getDefaultValue()
    this._initialValue =
      params.value !== undefined ? params.value : this._defaultValue
    const validity = this._validate(this._initialValue)
    this._stateNotifier = new BehaviorSubject<FieldState<T>>({
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
  }

  // Html
  override connect(element: HTMLInputElement) {
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
    })
  }

  protected abstract _getValueFromElement(element: HTMLInputElement): T

  protected abstract _setValueToElement(
    value: T,
    element: HTMLInputElement
  ): void

  // Value
  async setValue(value: T): Promise<void> {
    this._setValueToElement(value, await this.elementAsync)
    this._validateAndNotify(value)
  }

  protected abstract _getDefaultValue(): T

  protected _isEmpty(value: T): boolean {
    return value === this._defaultValue
  }

  // Validity
  protected _validate(value: T): FieldValidity {
    // const isEmpty = (value: T): boolean => value === this._defaultValue;
    const checkValidity = (value: T): string[] => {
      const invalidInputMessages: string[] = []
      const isEmpty = this._isEmpty(value)
      if (this.required && isEmpty)
        invalidInputMessages.push(REQUIRED_FIELD_MESSAGE)
      else return []
      for (let i = 0; i < this._validators.length; i++) {
        const validator = this._validators[i]
        if (!validator.validationFn(value)) {
          invalidInputMessages.push(validator.message)
        }
      }
      return invalidInputMessages
    }

    const invalidStateMessages = checkValidity(value)
    const isValid = invalidStateMessages.length === 0

    return { invalidStateMessages, isValid }
  }

  protected _validateAndNotify(value: T): void {
    const validity = this._validate(value)
    this._stateNotifier.next({
      ...this.state,
      value,
      ...validity,
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
}

export enum InputType {
  Button = 'button',
  Checkbox = 'checkbox',
  Color = 'color',
  Date = 'date',
  DatetimeLocal = 'datetime-local',
  Email = 'email',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Radio = 'radio',
  Range = 'range',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}

interface AbstractInputBuilderParams<T>
  extends AbstractFieldBuilderParams<T, HTMLInputElement> {
  value?: T
  type: InputType
}

interface AbstractInputExternalParams<T>
  extends AbstractInputBuilderParams<T>,
    AbstractFieldExternalParams<T, HTMLInputElement> {}

interface AbstractInputConstructorParams<T>
  extends AbstractInputBuilderParams<T>,
    AbstractFieldConstructorParams<T, HTMLInputElement> {}

export type {
  AbstractInputBuilderParams,
  AbstractInputExternalParams,
  AbstractInputConstructorParams,
}

interface AbstractSubInputBuilderParams<T>
  extends Omit<AbstractInputBuilderParams<T>, 'type'> {}

interface AbstractSubInputExternalParams<T>
  extends AbstractSubInputBuilderParams<T>,
    AbstractFieldExternalParams<T, HTMLInputElement> {}

interface AbstractSubInputConstructorParams<T>
  extends AbstractSubInputBuilderParams<T>,
    AbstractFieldConstructorParams<T, HTMLInputElement> {}

export type {
  AbstractSubInputBuilderParams,
  AbstractSubInputExternalParams,
  AbstractSubInputConstructorParams,
}
