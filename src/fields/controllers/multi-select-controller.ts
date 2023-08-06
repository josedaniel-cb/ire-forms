import { IreMultiSelectElement } from '../../components/stateful/multi-select-element'
import { FieldDefinition } from '../definition/field-definition'
import { FieldMultiPatch } from '../states/field-multi-patch'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { FieldValidationResult } from '../validators/field-validator'
import { MultiSelectFieldValidator } from '../validators/multi-select-validator'
import { Field, FieldController } from './field-controller'
import { HTMLTemplateResult } from 'lit'

export type SelectOption<T> = { label: string; value: T }

export class MultiSelectFieldValueState<T extends NonNullable<unknown>>
  implements FieldValueState<T[]>
{
  // This couldn't be #options because this error: Cannot read private member #options
  private _options: SelectOption<T>[]
  // private _index: number[]
  /**
   * Required because of MakeNullablePropertiesUndefined {@link FieldDefinition}
   */
  private _indexes: number[] | null
  private _value: T[]
  enabled: boolean
  validationResult: FieldValidationResult

  constructor(
    {
      options,
      indexes,
      value,
      enabled,
    }: {
      options: SelectOption<T>[]
      indexes: number[]
      value: T[]
      enabled: boolean
    },
    validator: MultiSelectFieldValidator<T>,
  ) {
    this._options = options
    // We must validate the indexes and value against the options
    // and give value priority over indexes
    this._indexes = []
    this._value = []
    if (value.length > 0) {
      this.value = value // Using setter
      // If value was invalid, try indexes
      if (this.value.length === 0) {
        this.indexes = indexes // Using setter
      }
    } else if (indexes.length > 0) {
      this.indexes = indexes // Using setter
    }

    this.enabled = enabled
    this.validationResult = validator.validate(this)
  }

  get options() {
    return this._options
  }

  set options(options: SelectOption<T>[]) {
    this._options = options
    this.#setEmpty()
  }

  get indexes() {
    return this._indexes
  }

  set indexes(indexes: number[] | null) {
    if (indexes == null) {
      this.#setEmpty()
      return
    }
    for (const i of indexes) {
      if (i < 0 || i >= this._options.length) {
        this.#setEmpty()
        throw new Error(`Index ${i} out of bounds`)
      }
    }

    this._indexes = indexes
    this._value = indexes.map((i) => this._options[i].value)
  }

  get value() {
    return this._value
  }

  set value(value: T[]) {
    if (value.length === 0) {
      this.#setEmpty()
      return
    }
    const indexes: number[] = []
    for (const v of value) {
      const actualIndex = this._options.findIndex(
        (option) => option.value === v,
      )
      if (actualIndex < 0) {
        this.#setEmpty()
        throw new Error(`Value ${v} not found in options`)
      }
      indexes.push(actualIndex)
    }
    // const sortedIndex = indexes.sort()
    this._indexes = indexes
    this._value = indexes.map((i) => this._options[i].value)
  }

  #setEmpty(): void {
    this._indexes = []
    this._value = []
  }

  toJsonSerializable(): {
    options: SelectOption<T>[]
    indexes: number[] | null
    value: T[]
    enabled: boolean
    validationResult: FieldValidationResult
  } {
    return {
      options: this._options,
      indexes: this._indexes,
      value: this._value,
      enabled: this.enabled,
      validationResult: this.validationResult,
    }
  }
}

export interface MultiSelectFieldUIState<T>
  extends FieldUIState<IreMultiSelectElement> {
  optionHtmlTemplateBuilder?: (option: SelectOption<T>) => HTMLTemplateResult
}

export type MultiSelectField<T extends NonNullable<unknown>> = Field<
  T[],
  MultiSelectFieldValueState<T>,
  IreMultiSelectElement,
  MultiSelectFieldUIState<T>
>

export class MultiSelectFieldController<
  T extends NonNullable<unknown>,
> extends FieldController<
  T[],
  MultiSelectFieldValueState<T>,
  IreMultiSelectElement,
  MultiSelectFieldUIState<T>
> {}

export type MultiSelectFieldDefinition<T extends NonNullable<unknown>> =
  FieldDefinition<
    T[],
    'multi-select',
    MultiSelectFieldValueState<T>,
    IreMultiSelectElement,
    MultiSelectFieldUIState<T>
  >

export type MultiSelectFieldMultiPatch<T extends NonNullable<unknown>> =
  FieldMultiPatch<
    T[],
    MultiSelectFieldValueState<T>,
    IreMultiSelectElement,
    MultiSelectFieldUIState<T>
  >
