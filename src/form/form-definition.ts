import { MultiSelectFieldDefinition } from '../fields/controllers/multi-select-controller'
import { SelectFieldDefinition } from '../fields/controllers/select-controller'
import { TextFieldDefinition } from '../fields/controllers/text-controller'

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
