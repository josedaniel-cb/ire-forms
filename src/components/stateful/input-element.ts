import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/text-field/controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class IreInputElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('input')
  inputEl!: HTMLInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  #valueState?: TextFieldValueState

  #uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    return html`
      <input
        type="text"
        class=${classMap({
          'form-control': true,
          'is-invalid': touched && errorMessage !== undefined,
        })}
        placeholder="${ifDefined(this.#uiState?.placeholder ?? undefined)}"
        ?disabled="${this.#valueState?.enabled ?? true}"
        @input="${this.#handleInput}"
        @blur="${this.#handleBlur}"
      />
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

      this.inputEl.value = state.value
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }

  #handleInput(_: Event): void {
    this.controller.value = this.inputEl.value
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-input': IreInputElement
  }
}
