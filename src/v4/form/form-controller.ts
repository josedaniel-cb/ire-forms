import { BehaviorSubject, Observable } from 'rxjs'
import { Field } from '../fields/field-controller'
import { FormDefinition } from './form-definition'
import { FormFields, FormFieldsPatch } from './form-fields'
import { FormValue, FormValuePatch } from './form-value'

export type FormControllerChildren = Record<
  string,
  Field<any, any, any> | Form<any>
>

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
}

// TODO: IMPLEMENT THE FOLLOWING REACTIVE ATTRIBUTES FOR FORM CONTROLLER:
// - LAYOUTS

// TODO: WE NEED TO BUILD A ROOT FORM CONTROLLER THAT SUPPORTS:
// - STYLESHEETS LINKS

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

  constructor({
    children,
  }: {
    children: FormControllerChildren
  }) {
    this.children = children

    this.fields = Object.entries(this.children).reduce(
      (fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.fields : child
        return fields
      },
      {} as Partial<FormFields<any>>,
    ) as FormFields<any>

    this.#valueSubject = new BehaviorSubject(
      Object.entries(this.children).reduce((fields, [key, child]) => {
        fields[key] = 'fields' in child ? child.value : child.state.value
        return fields
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
    return this.#valueSubject.asObservable()
  }

  patchFields(fieldsPropsPatch: FormFieldsPatch<T>): void {
    Object.entries(fieldsPropsPatch).forEach(([key, value]) => {
      const child = this.children[key]
      // child.patch(value)
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
}
