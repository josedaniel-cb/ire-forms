import {
  FieldValidationResult,
  FieldValidator,
} from '../validators/field-validator'
import { BehaviorSubject } from 'rxjs'

export interface FieldValueState<T> {
  value: T

  enabled: boolean

  validationResult: FieldValidationResult

  /**
   * Use this for JSON.stringify
   */
  toJsonSerializable?(): Object
}

/**
 * Used by {@link FieldValidator} validate function
 */
export type NonValidatedFieldValueState<T, V extends FieldValueState<T>> = Omit<
  V,
  'validationResult'
>

/**
 * Used by {@link Field} for prevent setting validationResult
 */
export type ExternalFieldValueState<T, V extends FieldValueState<T>> = Omit<
  V,
  'validationResult'
> & {
  readonly validationResult: FieldValidationResult
}

export class FieldValueStateBuilder {
  static proxy<T, V extends FieldValueState<T>>({
    valueState,
    validator,
    valueStateSubject: getValueStateSubject,
  }: {
    valueState: V
    validator: FieldValidator<T, V>
    valueStateSubject: () => BehaviorSubject<V>
  }): V {
    const valueStateProxy = new Proxy<V>(valueState, {
      set: (target: V, property: symbol | string, newValue: V[keyof V]) => {
        if (property === 'validationResult') {
          console.warn('You cannot set validationResult directly')
          return false
        }

        target[property as keyof typeof target] = newValue
        target.validationResult = validator.validate(target)
        const valueStateSubject = getValueStateSubject()
        valueStateSubject.next(valueStateProxy)
        return true
      },
    })
    return valueStateProxy
  }
}
