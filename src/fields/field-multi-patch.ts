import { FieldElement } from '../components/stateful/base/field-element'
import { FieldUIState } from './field-ui-state'
import { FieldValueState } from './field-value-state'

export type FieldMultiPatch<
  T,
  V extends FieldValueState<T>,
  E extends FieldElement,
  U extends FieldUIState<E>,
> = Omit<Partial<V>, 'validationResult'> & Omit<Partial<U>, 'htmlElement'>
