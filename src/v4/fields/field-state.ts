import { FieldValidationResult } from './field-validator'

export interface FieldValueState<T> {
  value: T

  enabled: boolean

  validationResult: FieldValidationResult // TODO: Become readonly
}

export type NonValidatedFieldValueState<T, V extends FieldValueState<T>> = Omit<
  V,
  'validationResult'
>

export type ExternalFieldValueState<T, V extends FieldValueState<T>> = Omit<
  V,
  'validationResult'
> & {
  readonly validationResult: FieldValidationResult
}

export interface FieldUIState {
  htmlElement: HTMLElement | null // TODO: Become readonly

  label: string

  touched: boolean
}

export type ExternalFieldUIState<U extends FieldUIState> = Omit<
  U,
  'htmlElement'
> & {
  readonly htmlElement: HTMLElement | null
}

export type FieldMultiPatch<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> = Omit<Partial<V>, 'validationResult'> & Omit<Partial<U>, 'htmlElement'>
