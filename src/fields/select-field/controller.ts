import { IreSelectElement } from '../../components/stateful/select-element'
import { Field, FieldController } from '../field-controller'
import { FieldDefinition } from '../field-definition'
import { FieldMultiPatch } from '../field-multi-patch'
import { FieldUIState } from '../field-ui-state'
import { FieldValidationResult } from '../field-validator'
import { FieldValueState } from '../field-value-state'
import { SelectFieldValidator } from './validator'

export class SelectFieldValueState<T extends NonNullable<unknown>>
  implements FieldValueState<T | null>
{
  // #options: { label: string; value: T }[] // Cannot read private member #options
  private _options: { label: string; value: T }[]
  // #index: number | null
  _index: number | null
  // #value: T | null // Cannot read private member #value
  private _value: T | null
  enabled: boolean
  validationResult: FieldValidationResult

  constructor(
    {
      options,
      index,
      value,
      enabled,
    }: {
      options: { label: string; value: T }[]
      index: number | null
      value: T | null
      enabled: boolean
    },
    validator: SelectFieldValidator<T>,
  ) {
    this._options = options
    // We must validate the index and value against the options
    // and give value priority over index
    this._index = null
    this._value = null
    if (value != null) {
      this.value = value // Using setter
      // If value was invalid, try index
      if (this.value == null) {
        this.index = index // Using setter
      }
    } else if (index != null) {
      this.index = index // Using setter
    }

    this.enabled = enabled
    this.validationResult = validator.validate(this)
  }

  get options() {
    return this._options
  }

  set options(options: { label: string; value: T }[]) {
    this._options = options
    this.#setNull()
  }

  get index() {
    return this._index
  }
  set index(index: number | null) {
    if (index != null && index >= 0 && index < this._options.length) {
      this._index = index
      this._value = this._options[index].value
    } else {
      this.#setNull()
    }
  }

  get value() {
    return this._value
  }

  set value(value: T | null) {
    if (value == null) {
      this.#setNull()
      return
    }

    const actualIndex = this._options.findIndex(
      (option) => option.value === value,
    )
    if (actualIndex >= 0) {
      this._index = actualIndex
      this._value = value
    } else {
      this.#setNull()
    }
  }

  #setNull(): void {
    this._index = null
    this._value = null
  }

  toJsonSerializable(): {
    options: {
      label: string
      value: T
    }[]
    index: number | null
    value: T | null
    enabled: boolean
    validationResult: FieldValidationResult
  } {
    return {
      options: this._options,
      index: this._index,
      value: this._value,
      enabled: this.enabled,
      validationResult: this.validationResult,
    }
  }
}

export interface SelectFieldUIState extends FieldUIState<IreSelectElement> {
  placeholder: string | null
}

export type SelectField<T extends NonNullable<unknown>> = Field<
  T | null,
  SelectFieldValueState<T>,
  IreSelectElement,
  SelectFieldUIState
>

export class SelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T | null,
  SelectFieldValueState<T>,
  IreSelectElement,
  SelectFieldUIState
> {}

export type SelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T | null,
    'select',
    SelectFieldValueState<T>,
    IreSelectElement,
    SelectFieldUIState
  >

export type SelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T | null,
    SelectFieldValueState<T>,
    IreSelectElement,
    SelectFieldUIState
  >
