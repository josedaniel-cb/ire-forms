import { FieldMultiPatch } from './field-multi-patch'
import { FieldUIState, FieldUIStateBuilder } from './field-ui-state'
import { FieldValidationResult, FieldValidator } from './field-validator'
import {
  ExternalFieldValueState,
  FieldValueState,
  FieldValueStateBuilder,
} from './field-value-state'
import {
  BehaviorSubject,
  Observable,
  Subject,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs'

export interface Field<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  readonly valueStateChanges: Observable<ExternalFieldValueState<T, V>>
  readonly valueState: ExternalFieldValueState<T, V>
  readonly valueChanges: Observable<T>
  value: T
  readonly validation: FieldValidationResult
  readonly validationChanges: Observable<FieldValidationResult>
  readonly isValid: boolean
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
    const valueStateProxy = FieldValueStateBuilder.proxy<T, V>({
      valueState,
      validator: this.#validator,
      valueStateSubject: () => this.#valueStateSubject,
    })
    this.#valueStateSubject = new BehaviorSubject<V>(valueStateProxy)
    const uiStateProxy = FieldUIStateBuilder.proxy({
      uiState,
      uiStateSubject: () => this.#uiStateSubject,
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

  get isValid(): boolean {
    return this.validation.isValid
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
    // this.#uiStateSubject.next({
    //   ...this.#uiStateSubject.value,
    //   htmlElement,
    // })
    this.#uiStateSubject.value.htmlElement = htmlElement
  }

  disconnect(): void {
    // this.#uiStateSubject.next({
    //   ...this.#uiStateSubject.value,
    //   htmlElement: null,
    // })
    this.#uiStateSubject.value.htmlElement = null
  }

  markAsTouched(): void {
    this.uiState.touched = true
  }
}
