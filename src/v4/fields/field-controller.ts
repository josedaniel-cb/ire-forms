import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs'
import { FieldType } from './field-type'
import {
  FieldValueState,
  FieldUIState,
  NonValidatedFieldValueState,
} from './field-state'
import { FieldValidationFn, FieldValidator } from './field-validator'

export interface FieldProps<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> {
  readonly valueState: V
  readonly uiState: U
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
> implements FieldProps<T, V, U>
{
  readonly #validator: FieldValidator<T, V>

  // // TODO: DIVIDE VISUAL STATE FROM VALUE ESTATE (value, validation and options)
  // TODO: CREATE A htmlElementSubject (why?)
  // TODO: PATCH method is unclear, create a method on field controller and ensure setting each property
  // being aware of proxies
  // readonly #stateSubject: BehaviorSubject<S>

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
}

type MakeNullablePropertiesUndefined<T> = {
  [K in keyof T]: Extract<T[K], null> extends never
    ? T[K]
    : Exclude<T[K], null> | undefined
}

export type FieldBuilderParams<
  T,
  K extends FieldType,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> = MakeNullablePropertiesUndefined<
  Omit<V, 'value' | 'validationResult' | 'enabled'>
> &
  MakeNullablePropertiesUndefined<Omit<U, 'htmlElement' | 'touched'>> & {
    type: K
    required?: boolean
    validators?: FieldValidationFn<T>[]

    // Value state
    value?: V['value']
    enabled?: boolean

    onValueChange?(value: T): void
    onRender?(htmlElement: HTMLElement): void
  }
