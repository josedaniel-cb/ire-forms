import {
  MultiSelectFieldController,
  MultiSelectFieldUIState,
  MultiSelectFieldValueState,
} from '../../fields/controllers/multi-select-controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

@customElement('ire-multi-select')
export class IreMultiSelectElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('input')
  inputEl!: HTMLInputElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: MultiSelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  #uiState?: MultiSelectFieldUIState

  protected _renderField(): HTMLTemplateResult {
    throw new Error('Method not implemented.')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
