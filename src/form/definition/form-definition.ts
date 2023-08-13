import { CheckboxesFieldDefinition } from '../../fields/controllers/checkboxes-controller'
import { ChipsFieldDefinition } from '../../fields/controllers/chips-controller'
import { NativeSelectFieldDefinition } from '../../fields/controllers/native-select-controller'
import { TextFieldDefinition } from '../../fields/controllers/text-controller'

export type FormDefinition = {
  fields: Record<string, FormDefinitionNode>
}

export type FormDefinitionNode = FormDefinitionLeaf | FormDefinition

export type FormDefinitionLeaf =
  | TextFieldDefinition
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | NativeSelectFieldDefinition<any>
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | ChipsFieldDefinition<any>
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  | CheckboxesFieldDefinition<any>
