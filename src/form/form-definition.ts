import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { TextFieldDefinition } from '../fields/text-field/controller'

export type FormDefinition = {
  fields: Record<string, FormDefinitionNode>
}

export type FormDefinitionNode = FormDefinitionLeaf | FormDefinition

export type FormDefinitionLeaf =
  | TextFieldDefinition
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | SelectFieldDefinition<any>
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | MultiSelectFieldDefinition<any>
