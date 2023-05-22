import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs'
import {
  FieldValueState,
  FieldUIState,
  FieldMultiPatch,
  ExternalFieldValueState,
  ExternalFieldUIState,
} from './field-states'
import { FieldValidator } from './field-validator'

export interface Field<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  value: T
  readonly valueState: ExternalFieldValueState<T, V>
  readonly uiState: ExternalFieldUIState<U>
  patch(multiPatch: FieldMultiPatch<T, V, U>): void
  readonly valueChanges: Observable<T>
  readonly renderChanges: Observable<HTMLElement>
}

export interface FieldParams<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  valueState: V
  uiState: U
  validator: FieldValidator<T, V>
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

  constructor({ valueState, uiState, validator }: FieldParams<T, V, U>) {
    this.#validator = validator
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

  get valueState(): V {
    return this.#valueStateSubject.value
  }

  get valueChanges(): Observable<T> {
    return this.#valueStateSubject.asObservable().pipe(
      map((state) => state.value),
      distinctUntilChanged(),
    )
  }

  get uiState(): U {
    return this.#uiStateSubject.value
  }

  get renderChanges(): Observable<HTMLElement> {
    return this.#uiStateSubject.asObservable().pipe(
      filter((htmlElement) => htmlElement !== null),
      map((state) => state.htmlElement!),
      distinctUntilChanged(),
    )
  }

  get value(): T {
    return this.valueState.value
  }

  set value(value: T) {
    this.valueState.value = value
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
}
