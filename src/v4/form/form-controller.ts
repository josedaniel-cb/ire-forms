import { BehaviorSubject, Observable } from 'rxjs'
import { FieldController, FieldProps } from '../fields/field-controller'
import { FormDefinition } from './form-definition'
import { FormValue, FormValuePatch, FormFields, FormFieldsPatch } from './trees'

// export type FormChild = FieldController<any, any> | FormController<any>
export type FormChild = FieldProps<any, any> | FormProps<any>

export type FormChildren = Record<string, FormChild>

export interface FormProps<T extends FormDefinition> {
  /**
   * Object that exposes fields only tree
   */
  readonly fields: FormFields<T>
  readonly value: FormValue<T>
  patch(patch: FormFieldsPatch<T>): void
  patchValues(patch: FormValuePatch<T>): void
  valueChanges: Observable<FormValue<T>>
}

export class FormController<T extends FormDefinition> implements FormProps<T> {
  readonly #children: FormChildren

  readonly fields: FormFields<T>

  readonly #valueSubject: BehaviorSubject<FormValue<T>>

  constructor({
    children,
  }: {
    children: FormChildren
  }) {
    this.#children = children

    this.fields = Object.entries(this.#children).reduce(
      (fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.fields : child
        return fields
      },
      {} as Partial<FormFields<any>>,
    ) as FormFields<any>

    this.#valueSubject = new BehaviorSubject(
      Object.entries(this.#children).reduce((fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.value : child.state.value
        return fields
      }, {} as Partial<FormValue<any>>) as FormValue<any>,
    )

    Object.entries(this.#children).forEach(([key, child]) => {
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
    return this.#valueSubject.asObservable()
  }

  patch(fieldsPropsPatch: FormFieldsPatch<T>): void {
    Object.entries(fieldsPropsPatch).forEach(([key, value]) => {
      if (value === undefined) return
      const child = this.#children[key]
      if ('fields' in child) {
        child.patch(value)
      } else {
        Object.entries(value).forEach(([key, value]) => {
          if (value === undefined) return
          child.state[key] = value
        })
      }
    })
  }

  patchValues(valuePatch: FormValuePatch<T>): void {
    Object.entries(valuePatch).forEach(([key, value]) => {
      if (value === undefined) return
      const child = this.#children[key]
      if ('fields' in child) {
        child.patchValues(value)
      } else {
        child.state.value = value
      }
    })
  }
}
