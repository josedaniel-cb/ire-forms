import { FieldState } from './field-state'
import { FieldType } from './field-type'

export type FieldParams<
  T extends FieldState<unknown>,
  K extends FieldType,
> = Omit<T, 'value'> & {
  type: K
  value?: T['value']
}
