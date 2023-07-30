import { FormNodeUI } from '../../form-ui/form-node-ui'
import { FormDefinition } from '../definition/form-definition'

export type FormBuildDefinition<T extends FormDefinition> = T & {
  uiConfig?: FormNodeUI
}
