import { MultiSelectFieldParams } from '../fields/multiple-select-field/controller'
import { SelectFieldParams } from '../fields/select-field/controller'
import { TextFieldParams } from '../fields/text-field/controller'

export type FormDefinition = {
  fields: Record<string, FormDefinitionNode>
}

export type FormDefinitionNode =
  | TextFieldParams
  | SelectFieldParams<any>
  | MultiSelectFieldParams<any>
  | FormDefinition
