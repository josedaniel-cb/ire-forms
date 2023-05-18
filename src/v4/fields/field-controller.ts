import { BehaviorSubject, Subscription } from 'rxjs'
import { FieldType } from './field-type'

export interface FieldState<T> {
  // Value
  value: T

  defaultValue?: T

  // Visual
  label: string

  // Validation
  required?: boolean

  validators?: ((value: T) => string | undefined)[]

  errorMessage?: string

  isValid: boolean

  touched: boolean

  enabled?: boolean
}

export interface FieldProps<T, S extends FieldState<T>> {
  readonly state: S

  onValueChange(
    callbackFn: (value: T, field: FieldProps<T, S>) => void,
  ): Subscription
}

export abstract class FieldController<T, S extends FieldState<T>>
  implements FieldProps<T, S>
{
  readonly #stateSubject: BehaviorSubject<S>

  constructor(params: FieldProps<T, S>) {
    this.#stateSubject = new BehaviorSubject<S>(params.state)
  }

  get state(): S {
    return this.#stateSubject.value
  }

  onValueChange(
    callbackFn: (value: T, field: FieldController<T, S>) => void,
  ): Subscription {
    return this.#stateSubject.asObservable().subscribe((state) => {
      callbackFn(state.value, this)
    })
  }
}

type FieldStateExcludedPropsFromParams = 'errorMessage' | 'isValid' | 'touched'

export type FieldParams<T extends FieldState<any>, K extends FieldType> = Omit<
  T,
  'value' | FieldStateExcludedPropsFromParams
> & {
  type: K
  value?: T['value']
}
