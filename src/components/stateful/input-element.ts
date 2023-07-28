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
  el!: HTMLInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  #valueState?: TextFieldValueState

  #uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const isInvalid = Boolean(
      this.#uiState?.touched && !this.#valueState?.validationResult.isValid,
    )
    return html`
      <input
        class=${classMap({
          'form-control': true,
          'is-invalid': isInvalid,
        })}
        placeholder="${ifDefined(this.#uiState?.placeholder ?? undefined)}"
        type="text"
        @input="${this.#handleInput}"
        @blur="${this.#handleBlur}"
      />
      ${this._renderValidationMessage(
        this.#valueState?.validationResult.errorMessage,
      )}
    `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe((state) => {
      this.#valueState = state
      this.requestUpdate()

      this.el.value = state.value
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }

  #handleInput(_: Event): void {
    this.controller.value = this.el.value
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}
