import { CSSResult } from 'lit'
import { FormUILayout } from './form-ui-layout'

export type FormNodeUI = {
  layout?: FormUILayout
  class?: string
  style?: CSSResult
}
