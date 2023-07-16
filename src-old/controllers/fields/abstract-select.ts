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
import { Option } from './select/options'

export interface AbstractSelect<
  T extends NonNullable<any>,
  O extends Option<T>,
  E extends HTMLElement,
> extends AbstractField<T, E> {
  get options(): O[]
  updateOptions(params: { options: O[]; index?: number }): void
  get index(): number
  set index(i: number)
  get indexChanges(): Observable<number>
  setIndex(index: number): Promise<void>
  getValueFromIndex(index: number): T | null
}

export abstract class AbstractSelectController<
    T extends NonNullable<any> = NonNullable<any>,
    // O extends Option<T> = Option<T>,
    O extends Option<T> = any,
    // E extends HTMLElement = HTMLElement
    E extends HTMLElement = any,
  >
  extends AbstractFieldController<T | null, E>
  implements AbstractSelect<T | null, O, E>
{
  // Options
  protected readonly _optionsNotifier: BehaviorSubject<O[]>

  // Index
  protected readonly _defaultIndex: number = -1

  protected _initialIndex: number // -1 or [0, n>

  protected readonly _indexNotifier: BehaviorSubject<number> // -1 or [0, n>

  // State
  protected readonly _stateNotifier: BehaviorSubject<FieldState<T | null>>

  constructor(params: AbstractSelectConstructorParams<T | null, O, E>) {
    super(params)

    // Options
    this._optionsNotifier = new BehaviorSubject<O[]>(params.options)

    // Index
    this._initialIndex = this._checkIndex(params.index)
    this._indexNotifier = new BehaviorSubject<number>(this._initialIndex)
    if (params.onIndexChange !== undefined)
      this.indexChanges.subscribe(params.onIndexChange)

    // State
    const validity = this._validate(this.index)
    this._stateNotifier = new BehaviorSubject<FieldState<T | null>>({
      value: this.getValueFromIndex(this.index),
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

  // HTML
  override connect(element: E): void {
    super.connect(element)

    // Initialize value
    this._setIndexToElement(this.index, element)

    // Manage validity
    element.addEventListener('focusout', () => {
      this.markAsTouched()
      this._stateNotifier.next(this.state)
    })
  }

  // Options
  get options(): O[] {
    return this._optionsNotifier.value
  }

  get optionsChanges(): Observable<O[]> {
    return this._optionsNotifier.pipe(takeUntil(this.form.unsubscribe))
  }

  updateOptions(params: { options: O[]; index?: number }): void {
    this.clean()
    this._optionsNotifier.next(params.options)
    this._initialIndex = this._checkIndex(params.index)
    this.index = this._initialIndex
  }

  // Index
  get index(): number {
    return this._indexNotifier.value
  }

  set index(i: number) {
    this.setIndex(i)
  }

  get indexChanges(): Observable<number> {
    return this._indexNotifier.pipe(takeUntil(this.form.unsubscribe))
  }

  protected _checkIndex(index: number | undefined): number {
    if (index === undefined) {
      return this._defaultIndex
    }
    if (index < 0 || index >= this.options.length) {
      index = this._defaultIndex
    }
    return index
  }

  async setIndex(index: number): Promise<void> {
    index = this._checkIndex(index)
    this._setIndexToElement(index, await this.elementAsync)
    this._validateAndNotify(index)
  }

  getValueFromIndex(index: number): T | null {
    return index !== this._defaultIndex ? this.options[this.index].value : null
  }

  get isEmpty() {
    return this.index === this._defaultIndex
  }

  // Value
  async setValue(value: T | null): Promise<void> {
    let i = this._defaultIndex
    if (value !== null) {
      i = this.options.findIndex((option) => option.value === value)
    }
    await this.setIndex(i)
  }

  // Validity
  protected _validate(index: number): FieldValidity {
    const isEmpty = (i: number): boolean => i === this._defaultIndex
    const checkValidity = (i: number): string[] => {
      const invalidInputMessages: string[] = []
      if (this.required && isEmpty(i))
        invalidInputMessages.push(REQUIRED_OPTION_MESSAGE)
      const value = this.getValueFromIndex(index)
      for (let i = 0; i < this._validators.length; i++)
        if (!this._validators[i].validationFn(value))
          invalidInputMessages.push(this._validators[i].message)
      return invalidInputMessages
    }

    const invalidStateMessages = checkValidity(index)

    return {
      invalidStateMessages,
      isValid: invalidStateMessages.length === 0,
    }
  }

  protected _validateAndNotify(index: number): void {
    this._indexNotifier.next(index)
    const validity = this._validate(index)
    this._stateNotifier.next({
      ...this.state,
      value: this.getValueFromIndex(index),
      ...validity,
    })
  }

  protected abstract _setIndexToElement(
    index: number,
    element: HTMLElement,
  ): void

  // General
  override reset(): void {
    super.reset()
    this.index = this._initialIndex
  }

  override clean(): void {
    super.clean()
    this.index = this._defaultIndex
  }
}

interface AbstractSelectBuilderParams<
  T,
  O extends Option<T>,
  E extends HTMLElement,
> extends AbstractFieldBuilderParams<T, E> {
  index?: number
  // options: Option<NonNullable<T>>[];
  options: O[]
  onIndexChange?(index: number): void
}

interface AbstractSelectExternalParams<
  T,
  O extends Option<T>,
  E extends HTMLElement,
> extends AbstractSelectBuilderParams<T, O, E>,
    AbstractFieldExternalParams<T, E> {}

interface AbstractSelectConstructorParams<
  T,
  O extends Option<T>,
  E extends HTMLElement,
> extends AbstractSelectBuilderParams<T, O, E>,
    AbstractFieldConstructorParams<T, E> {}

export type {
  AbstractSelectBuilderParams,
  AbstractSelectExternalParams,
  AbstractSelectConstructorParams,
}
