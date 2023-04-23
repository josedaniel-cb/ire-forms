import { BehaviorSubject, Observable, takeUntil } from 'rxjs'
import { REQUIRED_OPTION_MESSAGE } from '../../validators/messages'
import {
  AbstractField,
  AbstractFieldBuilderParams,
  AbstractFieldConstructorParams,
  AbstractFieldController,
  AbstractFieldExternalParams,
} from '../abstract-field'
import { FieldState, FieldValidity } from '../../core/states'
import { CustomOption as Option } from './select/options'

interface OptionArgs<T> extends Option<T> {
  selected?: boolean
}

export interface MultipleSelect<T>
  extends AbstractField<boolean[], HTMLElement> {
  get options(): Option<T>[]
  get selectedValues(): T[]
  updateOptions(options: OptionArgs<T>[]): void
}

export class MultipleSelectController<T>
  extends AbstractFieldController<boolean[], HTMLElement>
  implements MultipleSelect<T>
{
  // Options
  protected readonly _optionsNotifier: BehaviorSubject<Option<T>[]>

  // Value
  private _emptyValue: boolean[]

  protected _initialValue: boolean[]

  // State
  protected readonly _stateNotifier: BehaviorSubject<FieldState<boolean[]>>

  constructor(params: MultipleSelectConstructorParams<T>) {
    super(params)

    // Options
    const options = params.options.map((o) => ({
      value: o.value,
      template: o.template,
      textValue: o.textValue,
    }))
    this._optionsNotifier = new BehaviorSubject<Option<T>[]>(options)

    // Value
    this._emptyValue = params.options.map(() => false)
    this._initialValue = params.options.map((o) => o.selected ?? false)

    // State
    const { invalidStateMessages, isValid } = this._validate(this._initialValue)
    this._stateNotifier = new BehaviorSubject<FieldState<boolean[]>>({
      value: this._initialValue,
      touched: false,
      invalidStateMessages,
      isValid,
    })

    if (params.onStateChange !== undefined)
      this.stateChanges.subscribe(params.onStateChange)
    if (params.onValueChange !== undefined)
      this.valueChanges.subscribe(params.onValueChange)
    if (params.onValidityChange !== undefined)
      this.validityChanges.subscribe(params.onValidityChange)
  }

  // HTML
  override connect(element: HTMLElement): void {
    super.connect(element)

    // Initialize value
    this._setValueToElement(this.value, element)

    // Manage validity
    element.addEventListener('focusout', () => {
      this.markAsTouched()
      this._stateNotifier.next(this.state)
    })
  }

  // Options
  get options(): Option<T>[] {
    return this._optionsNotifier.value
  }

  get optionsChanges(): Observable<Option<T>[]> {
    return this._optionsNotifier.pipe(takeUntil(this.form.unsubscribe))
  }

  async updateOptions(optionsArgs: OptionArgs<T>[]): Promise<void> {
    this._emptyValue = optionsArgs.map(() => false)
    this._initialValue = optionsArgs.map((o) => o.selected ?? false)
    const options = optionsArgs.map((o) => ({
      value: o.value,
      template: o.template,
      textValue: o.textValue,
    }))
    this._optionsNotifier.next(options)
    this._setValueToElement(this._initialValue, await this.elementAsync)
    this._validateAndNotify(this._initialValue)
  }

  // Value
  async setValue(value: boolean[]): Promise<void> {
    if (value.length !== this.options.length) {
      throw new Error(
        '[ire-forms] Value length has to have the same length of options',
      )
    }
    this._setValueToElement(value, await this.elementAsync)
    this._validateAndNotify(value)
  }

  // Validity
  protected _validate(value: boolean[]): FieldValidity {
    const isEmpty = () => value.length === 0
    const checkValidity = (): string[] => {
      const invalidInputMessages: string[] = []
      if (this.required && isEmpty())
        invalidInputMessages.push(REQUIRED_OPTION_MESSAGE)
      for (let validator of this._validators)
        if (!validator.validationFn(value))
          invalidInputMessages.push(validator.message)
      return invalidInputMessages
    }

    const invalidStateMessages = checkValidity()
    const isValid = invalidStateMessages.length === 0

    return { invalidStateMessages, isValid }
  }

  protected _validateAndNotify(verifiedValue: boolean[]): void {
    const { invalidStateMessages, isValid } = this._validate(verifiedValue)
    const { touched } = this.state
    this._stateNotifier.next({
      value: verifiedValue,
      touched,
      invalidStateMessages,
      isValid,
    })
  }

  protected _setValueToElement(value: boolean[], _: HTMLElement): void {
    this.handleSetValueToElement(value)
  }

  handleSetValueToElement(value: boolean[]) {}

  handleClear() {}

  // General
  override reset(): void {
    super.reset()
    // this.value = this._initialValue
    this.setValue([...this._initialValue])
    this.handleClear()
  }

  override clean(): void {
    super.clean()
    // this.value = this._emptyValue
    this.setValue([...this._emptyValue])
    this.handleClear()
  }

  get selectedValues() {
    // return this.options
    //   .map((o, i) => ({ option: o, index: i }))
    //   .filter(({ index }) => this.value[index])
    //   .map(({ option: { value } }) => value)
    return this.options
      .filter((_, i) => this.value[i])
      .map(({ value }) => value)
  }

  // Solidn't
  markAsUntouched = this._markAsUntouched

  validateAndNotify = this._validateAndNotify
}

interface BuilderParams<T>
  extends AbstractFieldBuilderParams<boolean[], HTMLElement> {
  options: OptionArgs<T>[]
}

interface MultipleSelectExternalParams<T>
  extends BuilderParams<T>,
    AbstractFieldExternalParams<boolean[], HTMLElement> {
  controlType: 'multipleSelect'
}

export function makeMultipleSelectExternalParams<T>(
  params: BuilderParams<T>,
): MultipleSelectExternalParams<T> {
  return { ...params, controlType: 'multipleSelect' }
}

interface MultipleSelectConstructorParams<T>
  extends BuilderParams<T>,
    AbstractFieldConstructorParams<boolean[], HTMLElement> {}

export type {
  // BuilderParams,
  MultipleSelectExternalParams,
  MultipleSelectConstructorParams,
}
