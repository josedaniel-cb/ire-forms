import { BehaviorSubject, map, Observable, Subject, takeUntil } from 'rxjs'
import { FieldSet, FieldSetExternalParams } from '../core/field-set'
import {
  AbstractField,
  AbstractFieldController,
  AbstractFieldExternalParams,
} from './abstract-field'
import {
  FieldValidity,
  FormState,
  FormValidity,
  ValuesMap,
} from '../core/states'
import { FieldInterfacesMap } from './fields-map'
import { Flatten } from '../core/flatten'

export type FieldsMap = {
  [key: string]: AbstractFieldController<any, HTMLElement>
}

type BaseType = { controlType: keyof FieldInterfacesMap }

type GetInstancesMap<T extends { [key: string]: BaseType }> = {
  [K in keyof T]: FieldInterfacesMap[T[K]['controlType']]
}

type FormProxy<T extends FormParams> = {
  fields: GetInstancesMap<Flatten<T, BaseType>>
}

export type Form2<T extends FormParams> = Form & FormProxy<T>

export interface Form {
  get(fieldName: string): AbstractField<any, HTMLElement> | undefined
  get state(): FormState
  get value(): ValuesMap
  get valueChanges(): Observable<ValuesMap>
  patchValue(value: ValuesMap): void
  get isValid(): boolean
  get validity(): FormValidity
  get validityChanges(): Observable<FormValidity>
  get touched(): boolean
  get touchedChanges(): Observable<boolean>
  markAsTouched(): void
  reset(): void
  clean(): void
  dispose(): void
}

export class FormController implements Form {
  // Subscriptions
  readonly unsubscribe: Subject<void>

  // Fields
  protected _tree!: FieldSet

  protected _list!: AbstractFieldController<any, HTMLElement>[]

  protected _map!: FieldsMap

  // State
  protected _stateNotifier!: BehaviorSubject<FormState>

  static build(params: FormParams): FormController {
    const form = new FormController()
    const tree = new FieldSet({ ...params, form })
    form._setFields(tree)
    if (params.onStateChange !== undefined)
      form.stateChanges.subscribe(params.onStateChange)
    if (params.onValueChange !== undefined)
      form.valueChanges.subscribe(params.onValueChange)
    if (params.onValidityChange !== undefined)
      form.validityChanges.subscribe(params.onValidityChange)
    return form
  }

  static build2<T extends FormParams>(params: T): Form2<T> {
    const form = FormController.build(params)
    const proxy = new Proxy(form, {
      get: (target, key) => {
        if (key in target) {
          return target[key as keyof typeof target]
        }
        if (key === 'fields') {
          return form._map
        }
        return undefined
      },
    })

    return proxy as unknown as Form2<T>
  }

  protected constructor() {
    // Subscriptions
    this.unsubscribe = new Subject<void>()
  }

  protected _setFields(tree: FieldSet): void {
    // Fields
    this._tree = tree
    this._list = this._tree.toList()
    this._map = {}
    this._list.forEach((field) => (this._map[field.name] = field))

    // On filled events
    if (this._list.length > 0) {
      // this._list[this._list.length - 1].onFilled = () => location.reload();
      if (this._list.length > 1) {
        const n = this._list.length - 1
        for (let i = 0; i < n; i++) {
          this._list[i].onFilled = () => {
            // console.log(`${this._list[i].name} llama a ${this._list[i + 1].name}`);
            this._list[i + 1].focus()
          }
        }
      }
    }

    // Initialize value
    const initialValue: ValuesMap = {}
    const initialValidity: FormValidity = {
      isValid: true,
      invalidStateMessages: {},
    }
    this.list.forEach((field) => {
      initialValue[field.name] = field.value
      initialValidity.invalidStateMessages[field.name] = field.validity
      initialValidity.isValid &&= field.isValid
    })
    this._stateNotifier = new BehaviorSubject<FormState>({
      value: initialValue,
      ...initialValidity,
      touched: false,
    })

    // Subscribe to changes
    this.list.forEach((field) => {
      field.stateChanges.subscribe((state) => {
        const nextState = this.state
        nextState.value[field.name] = state.value
        // nextState.isValid &&= state.isValid
        nextState.isValid = this.list.every((f) => f.isValid)
        nextState.invalidStateMessages[field.name] = {
          isValid: state.isValid,
          invalidStateMessages: state.invalidStateMessages,
        }
        nextState.touched &&= state.touched
        this._stateNotifier.next(nextState)
      })
    })
  }

  // Fields
  get tree(): FieldSet {
    return this._tree
  }

  get list(): AbstractFieldController<any, HTMLElement>[] {
    return this._list
  }

  get map(): FieldsMap {
    return this._map
  }

  // get fields(): AbstractFieldController<any, HTMLElement>[] {
  //   return this.list
  // }

  get(
    fieldName: string,
  ): AbstractFieldController<any, HTMLElement> | undefined {
    if (fieldName in this._map) return this._map[fieldName]
    return undefined
  }

  // State
  get state(): FormState {
    return this._stateNotifier.value
  }

  get stateChanges(): Observable<FormState> {
    return this._stateNotifier.pipe(takeUntil(this.unsubscribe))
  }

  // Value
  get value(): ValuesMap {
    return this._stateNotifier.value.value
  }

  get valueChanges(): Observable<ValuesMap> {
    return this._stateNotifier.pipe(
      map((state) => state.value),
      takeUntil(this.unsubscribe),
    )
  }

  patchValue(value: ValuesMap): void {
    Object.keys(value).map((fieldName) => {
      const field = this.get(fieldName)
      if (field) {
        const fieldValue = value[fieldName]
        field.setValue(fieldValue)
      }
    })
  }

  // Validity
  get isValid(): boolean {
    return this._stateNotifier.value.isValid
  }

  get invalidStateMessages(): {
    [key: string]: FieldValidity
  } {
    return this._stateNotifier.value.invalidStateMessages
  }

  get validity(): FormValidity {
    return {
      isValid: this.isValid,
      invalidStateMessages: this.invalidStateMessages,
    }
  }

  get validityChanges(): Observable<FormValidity> {
    return this._stateNotifier.pipe(
      map((state) => {
        return {
          isValid: state.isValid,
          invalidStateMessages: state.invalidStateMessages,
        }
      }),
      takeUntil(this.unsubscribe),
    )
  }

  get touched(): boolean {
    return this._stateNotifier.value.touched
  }

  get touchedChanges(): Observable<boolean> {
    return this._stateNotifier.pipe(
      map((state) => state.touched),
      takeUntil(this.unsubscribe),
    )
  }

  markAsTouched(focus = true): void {
    this.list.forEach((field) => field.markAsTouched())
    if (focus) {
      this.list.find((field) => !field.isValid)?.focus()
    }
  }

  // General
  reset(): void {
    this.list.forEach((field) => field.reset())
  }

  clean(): void {
    this.list.forEach((field) => field.clean())
  }

  dispose(): void {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }
}

interface FormParams extends FieldSetExternalParams {
  onValueChange?(value: ValuesMap): void
  onValidityChange?(valid: FormValidity): void
  onStateChange?(state: FormState): void
}

export type { FormParams }
