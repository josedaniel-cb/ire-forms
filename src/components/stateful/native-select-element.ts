import {
  NativeSelectFieldController,
  NativeSelectFieldUIState,
} from '../../fields/controllers/native-select-controller'
import { SelectFieldValueState } from '../../fields/controllers/select/select-value-state'
import { formControlsCss } from '../css/form-controls-css'
import { formFieldCss } from '../css/form-field-css'
import { layoutsCss } from '../css/layout-css'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ire-native-select')
export class IreNativeSelectElement extends FieldElement {
  static override styles = [layoutsCss, formFieldCss, formControlsCss]

  @query('select')
  selectEl!: HTMLSelectElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: NativeSelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: SelectFieldValueState<any>

  #uiState?: NativeSelectFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    return html`
        <select
          class="form-select ${classMap({
            'is-invalid': touched && errorMessage !== undefined,
            'form-select--placeholder': this.#valueState?.index === null,
          })}"
          ?disabled="${!(this.#valueState?.enabled ?? true)}"
          @input="${this.#handleInput}"
          @blur="${this.#handleBlur}"
        >
          <option hidden>
            ${
              this.#uiState?.placeholder
                ? this.#uiState.placeholder
                : 'Choose an option'
            }
          </option>
          ${this.#valueState?.options.map(
            ({ label }, index) => html`
              <option value="${index}">${label}</option>
            `,
          )}
        </select>
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
      if (state.index !== null) {
        this.selectEl.selectedIndex = state.index + 1 // Add 1 to skip the placeholder
      } else {
        this.selectEl.selectedIndex = 0
      }
      this.requestUpdate()
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }

  #handleInput(_: Event): void {
    if (!this.#valueState) return
    const selectedIndex = this.selectEl.selectedIndex - 1 // Omit the placeholder
    this.controller.valueState.index = selectedIndex
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-native-select': IreNativeSelectElement
  }
}
