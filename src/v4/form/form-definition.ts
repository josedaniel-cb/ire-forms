import { MultiSelectFieldBuilderParams } from '../fields/multiple-select-field/controller'
import { SelectFieldBuilderParams } from '../fields/select-field/controller'
import { TextFieldBuilderParams } from '../fields/text-field/controller'

export type FormDefinition = {
  fields: Record<string, FormDefinitionNode>
}

export type FormDefinitionNode = FormDefinitionLeaf | FormDefinition

export type FormDefinitionLeaf =
  | TextFieldBuilderParams
  | SelectFieldBuilderParams<any>
  | MultiSelectFieldBuilderParams<any>
