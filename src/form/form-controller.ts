import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { Field, FieldController } from '../fields/field-controller'
import { FormDefinition } from './form-definition'
import { FormFields, FormFieldsPatch } from './form-fields'
import { FormValue, FormValuePatch } from './form-value'
import { FormUILayout } from '../form-ui/form-ui-layout'
import { CSSResult } from 'lit'
import { FormNodeUI } from '../form-ui/form-node-ui'

export interface Form<T extends FormDefinition> {
  /**
   * Tree of {@link Field}s.
   */
  readonly fields: FormFields<T>
  /**
   * Tree of {@link Field}s values.
   */
  readonly value: FormValue<T>
  patchFields(patch: FormFieldsPatch<T>): void
  patchValues(patch: FormValuePatch<T>): void
  valueChanges: Observable<FormValue<T>>
  dispose(): void
}

export type FormControllerChildren = Record<
  string,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  FieldController<any, any, any> | FormController<any>
  // Field<any, any, any> | Form<any>
>

export class FormController<T extends FormDefinition> implements Form<T> {
  /**
   * Tree of {@link Field}s and {@link Form}s.
   */
  readonly children: FormControllerChildren

  /**
   * Tree of fields only
   * @see Field
   */
  readonly fields: FormFields<T>

  readonly #valueSubject: BehaviorSubject<FormValue<T>>

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

    this.#valueSubject = new BehaviorSubject(
      Object.entries(this.children).reduce((fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.value : child.value
        return fields

        // rome-ignore lint/suspicious/noExplicitAny: any is required here
      }, {} as Partial<FormValue<any>>) as FormValue<any>,
    )

    Object.entries(this.children).forEach(([key, child]) => {
      child.valueChanges.subscribe((childValue) => {
        this.#valueSubject.next({
          ...this.#valueSubject.value,
          [key]: childValue,
        })
      })
    })
  }

  get value(): FormValue<T> {
    return this.#valueSubject.value
  }

  get valueChanges(): Observable<FormValue<T>> {
    return this.#valueSubject
      .asObservable()
      .pipe(takeUntil(this.#unsubscribeSubject))
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
