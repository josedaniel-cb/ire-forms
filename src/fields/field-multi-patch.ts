import { FieldUIState } from './field-ui-state'
import { FieldValueState } from './field-value-state'

export type FieldMultiPatch<
  T,
  V extends FieldValueState<T>,
  U extends FieldUIState,
> = Omit<Partial<V>, 'validationResult'> & Omit<Partial<U>, 'htmlElement'>
