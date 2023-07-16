import {
  BehaviorSubject,
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs'
import { FieldValueState, FieldUIState, FieldMultiPatch } from './field-states'
import { FieldValidationResult, FieldValidator } from './field-validator'

export interface Field<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  // value: T
  // readonly valueState: ExternalFieldValueState<T, V>
  // readonly uiState: ExternalFieldUIState<U>
  // patch(multiPatch: FieldMultiPatch<T, V, U>): void
  // readonly valueChanges: Observable<T>
  // readonly renderChanges: Observable<HTMLElement>
  readonly valueStateChanges: Observable<V>
  readonly valueState: V
  readonly valueChanges: Observable<T>
  value: T
  readonly validation: FieldValidationResult
  readonly validationChanges: Observable<FieldValidationResult>
  readonly uiStateChanges: Observable<U>
  readonly uiState: U
  readonly renderChanges: Observable<HTMLElement>
  readonly required: boolean
  patch(multiPatch: FieldMultiPatch<T, V, U>): void
  markAsTouched(): void
}

export interface FieldParams<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  valueState: V
  uiState: U
  validator: FieldValidator<T, V>
  unsubscribeSubject: Subject<void>
}

export abstract class FieldController<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> implements Field<T, V, U>
{
  readonly #validator: FieldValidator<T, V>

  readonly #valueStateSubject: BehaviorSubject<V>

  readonly #uiStateSubject: BehaviorSubject<U>

  readonly #unsubscribeSubject: Subject<void>

  constructor({
    valueState,
    uiState,
    validator,
    unsubscribeSubject,
  }: FieldParams<T, V, U>) {
    this.#validator = validator
    this.#unsubscribeSubject = unsubscribeSubject
    const valueStateProxy = new Proxy<V>(valueState, {
      set: (target: V, property: symbol | string, newValue: V[keyof V]) => {
        if (property === 'validation') {
          console.warn('You cannot set validation directly')
          return false
        }

        target[property as keyof typeof target] = newValue
        target.validationResult = this.#validator.validate(target)
        this.#valueStateSubject.next(valueStateProxy)
        return true
      },
    })
    this.#valueStateSubject = new BehaviorSubject<V>(valueStateProxy)
    const uiStateProxy = new Proxy<U>(uiState, {
      set: (target: U, property: symbol | string, newValue: U[keyof U]) => {
        if (property === 'htmlElement') {
          console.warn('You cannot set htmlElement directly')
          return false
        }
        target[property as keyof typeof target] = newValue
        this.#uiStateSubject.next(uiStateProxy)
        return true
      },
    })
    this.#uiStateSubject = new BehaviorSubject<U>(uiStateProxy)
  }

  get valueStateChanges(): Observable<V> {
    return this.#valueStateSubject.asObservable()
  }

  get valueState(): V {
    return this.#valueStateSubject.value
  }

  get valueChanges(): Observable<T> {
    return this.#valueStateSubject.asObservable().pipe(
      map((state) => state.value),
      distinctUntilChanged(),
      takeUntil(this.#unsubscribeSubject),
    )
  }

  get value(): T {
    return this.valueState.value
  }

  set value(value: T) {
    this.valueState.value = value
  }

  get validation(): FieldValidationResult {
    return this.#valueStateSubject.value.validationResult
  }

  get validationChanges(): Observable<FieldValidationResult> {
    return this.#valueStateSubject.asObservable().pipe(
      map((state) => state.validationResult),
      distinctUntilChanged((previous, current) => {
        return (
          previous.isValid === current.isValid &&
          previous.errorMessage === current.errorMessage
        )
      }),
      takeUntil(this.#unsubscribeSubject),
    )
  }

  get uiStateChanges(): Observable<U> {
    return this.#uiStateSubject.asObservable()
  }

  get uiState(): U {
    return this.#uiStateSubject.value
  }

  get renderChanges(): Observable<HTMLElement> {
    return this.#uiStateSubject.asObservable().pipe(
      filter((htmlElement) => htmlElement !== null),
      // rome-ignore lint/style/noNonNullAssertion: it filters out nulls
      map((state) => state.htmlElement!),
      distinctUntilChanged(),
      takeUntil(this.#unsubscribeSubject),
    )
  }

  get required(): boolean {
    return this.#validator.required
  }

  patch(multiPatch: FieldMultiPatch<T, V, U>): void {
    for (const entry in Object.entries(multiPatch)) {
      const [key, value] = entry
      if (key in this.valueState) {
        this.valueState[key as keyof V] = value as V[keyof V]
      } else if (key in this.uiState) {
        this.uiState[key as keyof U] = value as U[keyof U]
      } else {
        console.warn(`Unknown property ${key}`)
      }
    }
  }

  connect(htmlElement: HTMLElement): void {
    this.#uiStateSubject.next({
      ...this.#uiStateSubject.value,
      htmlElement,
    })
  }

  disconnect(): void {
    this.#uiStateSubject.next({
      ...this.#uiStateSubject.value,
      htmlElement: null,
    })
  }

  markAsTouched(): void {
    this.uiState.touched = true
  }
}
