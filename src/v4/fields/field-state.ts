import { FieldValidationResult } from './field-validator'

export interface FieldState<T> {
  value: T

  htmlElement: HTMLElement | null

  validation: FieldValidationResult

  // Visual
  label: string

  touched: boolean

  // enabled?: boolean
  enabled: boolean
}
