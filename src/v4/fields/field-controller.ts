import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs'
import { FieldType } from './field-type'
import { FieldState } from './field-state'
import { FieldValidationFn, FieldValidator } from './field-validator'

export interface FieldProps<T, S extends FieldState<T>> {
  readonly state: S
  readonly valueChanges: Observable<T>
  readonly renderChanges: Observable<HTMLElement>
}

export interface FieldParams<T, S extends FieldState<T>> {
  state: S
  validator: FieldValidator<T>
}

export abstract class FieldController<T, S extends FieldState<T>>
  implements FieldProps<T, S>
{
  readonly #validator: FieldValidator<T>

  // TODO: DIVIDE VISUAL STATE FROM VALUE ESTATE (value, validation and options)
  // TODO: CREATE A htmlElementSubject
  // TODO: PATCH method is unclear, create a method on field controller and ensure setting each property
  // being aware of proxies
  readonly #stateSubject: BehaviorSubject<S>

  constructor({ state, validator }: FieldParams<T, S>) {
    this.#validator = validator
    this.#stateSubject = new BehaviorSubject<S>(
      new Proxy<S>(state, {
        // get: (target: S, property: symbol | string) => {
        //   return property in target
        //     ? target[property as keyof typeof target]
        //     : undefined
        // },
        set: (target: S, property: symbol | string, newValue: S[keyof S]) => {
          if (property === 'value') {
            target.validation = this.#validator.validate(newValue as S['value'])
          } else if (property === 'validation') {
            console.warn('You cannot set validation directly')
            return false
          }
          target[property as keyof typeof target] = newValue
          this.#stateSubject.next(target)
          return true
        },
      }),
    )
  }

  get state(): S {
    return this.#stateSubject.value
  }

  get valueChanges(): Observable<T> {
    return this.#stateSubject.asObservable().pipe(
      map((state) => state.value),
      distinctUntilChanged(),
    )
  }

  get renderChanges(): Observable<HTMLElement> {
    return this.#stateSubject.asObservable().pipe(
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
  S extends FieldState<T>,
  K extends FieldType,
> = MakeNullablePropertiesUndefined<
  Omit<S, 'value' | 'validation' | 'touched' | 'enabled' | 'htmlElement'>
> & {
  type: K
  value?: S['value']
  required?: boolean
  validators?: FieldValidationFn<T>[]
  enabled?: boolean
  onValueChange?(value: T): void
  onRender?(htmlElement: HTMLElement): void
}
