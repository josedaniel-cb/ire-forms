import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs'
import { Field, FieldController } from '../fields/field-controller'
import { FormDefinition } from './form-definition'
import { FormFields, FormFieldsPatch } from './form-fields'
import { FormValue, FormValueBuilder, FormValuePatch } from './form-value'
import { FormNodeUI } from '../form-ui/form-node-ui'
import { FormValueState } from './form-value-state'

export interface Form<T extends FormDefinition> {
  /**
   * Tree of {@link Field}s
   */
  readonly fields: FormFields<T>
  patchFields(patch: FormFieldsPatch<T>): void

  readonly valueState: FormValueState<T>
  valueStateChanges: Observable<FormValueState<T>>

  /**
   * Tree of {@link Field} values.
   */
  readonly value: FormValue<T>
  valueChanges: Observable<FormValue<T>>
  patchValues(patch: FormValuePatch<T>): void

  dispose(): void
}

export type FormControllerChildren = Record<
  string,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  FieldController<any, any, any> | FormController<any>
>

export class FormController<T extends FormDefinition> implements Form<T> {
  /**
   * Tree of {@link FieldController}s and {@link FormController}s.
   */
  readonly children: FormControllerChildren

  /**
   * Tree of {@link Field}s only
   */
  readonly fields: FormFields<T>

  // readonly #valueSubject: BehaviorSubject<FormValue<T>>
  readonly #valueStateSubject: BehaviorSubject<FormValueState<T>>

  // UI
  readonly uiConfig?: FormNodeUI

  // Subscriptions
  readonly #unsubscribeSubject: Subject<void>

  constructor({
    uiConfig,
    children,
    unsubscribeSubject,
  }: {
    uiConfig?: FormNodeUI
    children: FormControllerChildren
    unsubscribeSubject: Subject<void>
  }) {
    this.uiConfig = uiConfig
    this.children = children
    this.#unsubscribeSubject = unsubscribeSubject

    this.fields = Object.entries(this.children).reduce(
      (fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.fields : child
        return fields
      },
      // rome-ignore lint/suspicious/noExplicitAny: any is required here
      {} as Partial<FormFields<any>>,

      // rome-ignore lint/suspicious/noExplicitAny: any is required here
    ) as FormFields<any>

    this.#valueStateSubject = new BehaviorSubject(
      Object.entries(this.children).reduce((fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.valueState : child.valueState
        return fields

        // rome-ignore lint/suspicious/noExplicitAny: any is required here
      }, {} as Partial<FormValueState<any>>) as FormValueState<any>,
    )

    Object.entries(this.children).forEach(([key, child]) => {
      if ('fields' in child) {
        const formController = child
        formController.valueStateChanges.subscribe((valueState) => {
          this.#valueStateSubject.next({
            ...this.#valueStateSubject.value,
            [key]: valueState,
          })
        })
        return
      }
      const fieldController = child
      fieldController.valueStateChanges.subscribe((valueState) => {
        this.#valueStateSubject.next({
          ...this.#valueStateSubject.value,
          [key]: valueState,
        })
      })
    })
  }

  get valueState(): FormValueState<T> {
    return this.#valueStateSubject.value
  }

  get valueStateChanges(): Observable<FormValueState<T>> {
    return this.#valueStateSubject
      .asObservable()
      .pipe(takeUntil(this.#unsubscribeSubject))
  }

  get value(): FormValue<T> {
    return FormValueBuilder.fromValueState(this.#valueStateSubject.value)
  }

  get valueChanges(): Observable<FormValue<T>> {
    return this.#valueStateSubject.asObservable().pipe(
      map((valueState) => {
        return FormValueBuilder.fromValueState(valueState)
      }),
      takeUntil(this.#unsubscribeSubject),
    )
  }

  patchFields(fieldsPropsPatch: FormFieldsPatch<T>): void {
    Object.entries(fieldsPropsPatch).forEach(([key, value]) => {
      const child = this.children[key]
      if ('fields' in child) {
        child.patchFields(value)
      } else {
        child.patch(value)
      }
    })
  }

  patchValues(valuePatch: FormValuePatch<T>): void {
    Object.entries(valuePatch).forEach(([key, value]) => {
      const child = this.children[key]
      if ('fields' in child) {
        child.patchValues(value)
      } else {
        child.valueState.value = value
      }
    })
  }

  dispose(): void {
    this.#unsubscribeSubject.next()
    this.#unsubscribeSubject.complete()
  }
}
