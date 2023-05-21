import { FieldValidationResult } from './field-validator'

// export interface FieldState<T> {
//   value: T

//   htmlElement: HTMLElement | null

//   validation: FieldValidationResult

//   // Visual
//   label: string

//   touched: boolean

//   // enabled?: boolean
//   enabled: boolean
// }

export interface FieldValueState<T> {
  value: T

  enabled: boolean

  validationResult: FieldValidationResult // TODO: Become readonly
}

export interface FieldUIState {
  htmlElement: HTMLElement | null

  label: string

  touched: boolean
}

export type NonValidatedFieldValueState<T, V extends FieldValueState<T>> = Omit<
  V,
  'validationResult'
>
