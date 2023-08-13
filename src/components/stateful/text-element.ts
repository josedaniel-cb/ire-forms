import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/controllers/text-controller'
import { formControlsCss } from '../css/form-controls-css'
import { formFieldCss } from '../css/form-field-css'
import { layoutsCss } from '../css/layout-css'
import { FieldElement } from './base/field-element'
import './components/input-element'
import { IreInputElement } from './components/input-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'

@customElement('ire-text')
export class IreTextElement extends FieldElement {
  static override styles = [layoutsCss, formFieldCss, formControlsCss]

  @query('ire-input')
  ireInputEl!: IreInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  #valueState?: TextFieldValueState

  #uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = touched && errorMessage !== undefined
    return html`
      <ire-input
        .placeholder=${this.#uiState?.placeholder ?? undefined}
        .isInvalid=${isInvalid}
        .enabled=${this.#valueState?.enabled ?? true}
        @inputchange=${(
          e: CustomEvent<{
            value: string
          }>,
        ) => {
          this.controller.value = e.detail.value
        }}
        @inputblur=${() => {
          this.controller.markAsTouched()
        }}
      ></ire-input>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
    `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe((state) => {
      this.#valueState = state
      this.requestUpdate()

      this.ireInputEl.inputEl.value = state.value
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-text': IreTextElement
  }
}
