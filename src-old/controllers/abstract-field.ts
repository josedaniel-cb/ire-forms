import {
  BehaviorSubject,
  distinct,
  distinctUntilChanged,
  filter,
  firstValueFrom,
  map,
  Observable,
  takeUntil,
} from 'rxjs'
import { Attributes } from '../core/attributes'
import { Validator } from '../validators/validators'
import { Form, FormController } from './form'
import { FieldState, FieldValidity } from '../core/states'
import {
  FormButtonSet,
  FormButtonSetArgs,
} from '../core/buttons/form-button-set'
import { FieldInterfacesMap } from './fields-map'

export interface AbstractField<T, E extends HTMLElement> {
  readonly form: Form
  disabled: boolean
  // required: boolean;
  value: T
  valueChanges: Observable<T>
  setValue(value: T): Promise<void>
  get state(): FieldState<T>
  get stateChanges(): Observable<FieldState<T>>
  get isValid(): boolean
  get validity(): FieldValidity
  get validityChanges(): Observable<FieldValidity>
  get invalidStateMessages(): string[]
  get touched(): boolean
  markAsTouched(): void
  get element(): E | null
  get elementAsync(): Promise<E>
  get elementChanges(): Observable<E | null>
  focus(): Promise<void>
  blur(): Promise<void>
  reset(): void
  clean(): void
  dispose(): void
}

export abstract class AbstractFieldController<
  T = any,
  E extends HTMLElement = any,
> implements AbstractField<T, E>
{
  // Form controller reference
  readonly form: FormController

  // Buttons
  readonly buttons?: FormButtonSet

  // Inmutable attributes
  readonly name: string

  // Inmutable attributes (wrapper)
  readonly wrapperClasses?: string

  readonly wrapperStyles?: string

  readonly label?: string

  // Mutable attributes
  protected readonly _attributes: Attributes

  // State
  protected abstract readonly _stateNotifier: BehaviorSubject<FieldState<T>>

  // Validity
  protected readonly _validators: Validator<T>[]

  // HTML
  protected readonly _elementNotifier: BehaviorSubject<E | null>

  // Next
  onFilled: () => void = () => {}

  constructor(params: AbstractFieldConstructorParams<T, E>) {
    // Form
    this.form = params.form

    // Inmutable attributes and properties
    this.name = params.name
    this.wrapperClasses = params.classes
    this.wrapperStyles = params.styles
    this.label = params.label

    // Mutable attribute
    this._attributes = new Attributes()
    this.required = params.required ?? true
    this.disabled = params.disabled ?? false

    // Validity
    this._validators = params.validators !== undefined ? params.validators : []

    // HTML
    this._elementNotifier = new BehaviorSubject<E | null>(null)
    if (params.onRender !== undefined)
      this.renderedElementChanges.subscribe((element) =>
        params.onRender!(element),
      )

    // Buttons
    if (params.buttons) {
      this.buttons = FormButtonSet.build(params.buttons)
    }
  }

  // Mutable attributes
  get disabled(): boolean {
    return this._attributes.getBoolean('disabled')
  }

  set disabled(value: boolean) {
    this._attributes.setBoolean('disabled', value)
  }

  get required(): boolean {
    return this._attributes.getBoolean('required')
  }

  set required(value: boolean) {
    this._attributes.setBoolean('required', value)
  }

  // Value
  get value(): T {
    return this._stateNotifier.value.value
  }

  set value(value: T) {
    this.setValue(value)
  }

  abstract setValue(value: T): Promise<void>

  get valueChanges(): Observable<T> {
    return this._stateNotifier.pipe(
      map((state) => state.value),
      // distinct(),
      distinctUntilChanged(),
      takeUntil(this.form.unsubscribe),
    )
  }

  // State
  get state(): FieldState<T> {
    return this._stateNotifier.value
  }

  get stateChanges(): Observable<FieldState<T>> {
    return this._stateNotifier.pipe(takeUntil(this.form.unsubscribe))
  }

  // Validity
  get isValid(): boolean {
    return this._stateNotifier.value.isValid
  }

  get validity(): FieldValidity {
    return {
      isValid: this.isValid,
      invalidStateMessages: this.invalidStateMessages,
    }
  }

  get validityChanges(): Observable<FieldValidity> {
    return this._stateNotifier.pipe(
      map((state) => {
        return {
          isValid: state.isValid,
          invalidStateMessages: this.invalidStateMessages,
        }
      }),
      // distinct(({ invalidStateMessages }) => invalidStateMessages),
      distinctUntilChanged(
        (prev, curr) => prev.invalidStateMessages === curr.invalidStateMessages,
      ),
      takeUntil(this.form.unsubscribe),
    )
  }

  get invalidStateMessages(): string[] {
    return this._stateNotifier.value.invalidStateMessages
  }

  get touched(): boolean {
    return this._stateNotifier.value.touched
  }

  markAsTouched(): void {
    this._stateNotifier.next({
      ...this.state,
      touched: true,
    })
  }

  protected async _markAsUntouched() {
    // TODO: TEST REQUIRED
    await this.blur()
    this._stateNotifier.next({
      ...this.state,
      touched: false,
    })
  }

  // HTML
  get element(): E | null {
    return this._elementNotifier.value
  }

  get elementChanges(): Observable<E | null> {
    return this._elementNotifier.pipe(takeUntil(this.form.unsubscribe))
  }

  get renderedElementChanges(): Observable<E> {
    return this.elementChanges.pipe(
      filter((value) => value !== null),
      map((value) => value!),
      distinctUntilChanged(),
      takeUntil(this.form.unsubscribe),
    )
  }

  get elementAsync(): Promise<E> {
    return firstValueFrom(this.renderedElementChanges)
  }

  connect(element: E): void {
    // Set attributes
    Object.keys(this._attributes.value).forEach((name) => {
      const value = this._attributes.value[name]
      element.setAttribute(name, value)
    })

    // Subscribe to attributes changes
    this._attributes.changes.subscribe((changesList) =>
      changesList.forEach((change) => {
        if (change.value !== undefined)
          element.setAttribute(change.name, change.value)
        else element.removeAttribute(change.name)
      }),
    )

    this._elementNotifier.next(element)
  }

  disconnect() {
    this._elementNotifier.next(null)
  }

  async focus(): Promise<void> {
    ;(await this.elementAsync).focus()
  }

  async blur(): Promise<void> {
    ;(await this.elementAsync).blur()
  }

  // General
  reset(): void {
    this._markAsUntouched()
  }

  clean(): void {
    this._markAsUntouched()
  }

  dispose(): void {
    this.form.unsubscribe.next()
    this.form.unsubscribe.complete()
    this._attributes.dispose()
  }
}

// export enum ControlType {
//   TextInput,
//   NumberInput,
//   CheckboxInput,
//   FileInput,
//   PasswordInput,
//   DateInput,
//   TimeInput,

//   Select,
//   CustomSelect,
//   Radios,

//   TextArea,
// }

export type ControlType = keyof FieldInterfacesMap

interface AbstractFieldBuilderParams<T, E extends HTMLElement> {
  // name: string
  label?: string
  classes?: string
  styles?: string
  required?: boolean
  disabled?: boolean
  validators?: Validator<T>[]
  onRender?(element: E): void

  buttons?: FormButtonSetArgs

  // Used by descendants
  onValueChange?(value: T): void
  onValidityChange?(validity: FieldValidity): void
  onStateChange?(state: FieldState<T>): void
}

interface AbstractFieldExternalParams<T, E extends HTMLElement>
  extends AbstractFieldBuilderParams<T, E> {
  controlType: ControlType
}

interface AbstractFieldConstructorParams<T, E extends HTMLElement>
  extends AbstractFieldBuilderParams<T, E> {
  name: string
  form: FormController
}

export type {
  AbstractFieldBuilderParams,
  AbstractFieldExternalParams,
  AbstractFieldConstructorParams,
}
