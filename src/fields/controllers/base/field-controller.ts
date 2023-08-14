import { FieldElement } from '../../../components/stateful/base/field-element'
import { FieldMultiPatch } from '../../states/field-multi-patch'
import { FieldUIState, FieldUIStateBuilder } from '../../states/field-ui-state'
import {
  ExternalFieldValueState,
  FieldValueState,
  FieldValueStateBuilder,
} from '../../states/field-value-state'
import {
  FieldValidationResult,
  FieldValidator,
} from '../../validators/base/field-validator'
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
  E extends FieldElement,
  U extends FieldUIState<E>,
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
  patch(multiPatch: FieldMultiPatch<T, V, E, U>): void
  markAsTouched(): void
}

export interface FieldParams<
  T,
  V extends FieldValueState<T>,
  E extends FieldElement,
  U extends FieldUIState<E>,
> {
  valueState: V
  uiState: U
  validator: FieldValidator<T, V>
  unsubscribeSubject: Subject<void>
}

export abstract class FieldController<
  T,
  V extends FieldValueState<T>,
  E extends FieldElement,
  U extends FieldUIState<E>,
> implements Field<T, V, E, U>
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
  }: FieldParams<T, V, E, U>) {
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

  get renderChanges(): Observable<E> {
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

  patch(multiPatch: FieldMultiPatch<T, V, E, U>): void {
    const entries = Object.entries(multiPatch)

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i]
      if (key in this.valueState) {
        this.valueState[key as keyof V] = value as V[keyof V]
      } else if (key in this.uiState) {
        this.uiState[key as keyof U] = value as U[keyof U]
      } else {
        console.warn(
          `Trying to set ${JSON.stringify(
            value,
          )} to unknown property ${JSON.stringify(key)}`,
        )
      }
    }
  }

  connect(htmlElement: E): void {
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
