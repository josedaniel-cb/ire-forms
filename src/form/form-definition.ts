import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { TextFieldDefinition } from '../fields/text-field/controller'
import { FormNodeUI } from '../form-ui/form-node-ui'

export type FormDefinition = {
  fields: Record<string, FormDefinitionNode>
  uiConfig?: FormNodeUI
}

export type FormDefinitionNode = FormDefinitionLeaf | FormDefinition

export type FormDefinitionLeaf =
  | TextFieldDefinition
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | SelectFieldDefinition<any>
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | MultiSelectFieldDefinition<any>
