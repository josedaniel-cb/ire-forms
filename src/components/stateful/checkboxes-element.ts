import { HTMLTemplateResult, html } from 'lit'
import { customElement, property, queryAll } from 'lit/decorators.js'
import {
  CheckboxesFieldController,
  CheckboxesFieldUIState,
} from '../../fields/controllers/checkboxes-controller'
import { FieldElement } from './base/field-element'

import 'last-icon'
import {
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select/multi-select-value-state'
import { FormUILayouts } from '../../form-ui/form-ui-layout'
import { layoutsCss } from '../css/layout-css'
import { bootstrapCss2 } from './bootstrap2'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-checkboxes')
export class IreCheckboxesElement extends FieldElement {
  static override styles = [layoutsCss, bootstrapCss2]

  @queryAll('input')
  inputEls!: NodeListOf<HTMLInputElement>

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: CheckboxesFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #uiState?: CheckboxesFieldUIState<any>

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe(async (state) => {
      this.#uiState = state
      this.requestUpdate()
      await this.updateComplete
    })
  }

  override render() {
    return html`
      ${this._renderLabel()}
      ${this._renderField()}
    `
  }

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const layout = this.#uiState?.layout ?? FormUILayouts.singleColumn
    return html`
      <div
        class=${layout.classes}
        style="${layout.styles}"
      >
        ${this.#valueState?.options.map((option, i) => {
          return html`
            <label class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                .disabled=${!(this.#valueState?.enabled ?? true)}
                @input=${() => this.#handleInput(i)}
                @blur=${() => this.#handleBlur()}
              >
              <span class="form-check-label">
                ${this.#renderLabel(option, i)}
              </span>
            </label>
          `
        })}
      </div>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
    `
  }

  #renderLabel(option: Option, index: number) {
    if (this.#uiState?.optionHtmlTemplateBuilder) {
      return this.#uiState.optionHtmlTemplateBuilder(option, index)
    }
    return option.label
  }

  #handleInput(_: number): void {
    this.controller.valueState.indexes = [...this.inputEls]
      .map((el, index) => [index, el.checked] as [number, boolean])
      .filter(([_, checked]) => checked)
      .map(([index, _]) => index)
  }

  #handleBlur(): void {
    this.controller.markAsTouched()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-checkboxes': IreCheckboxesElement
  }
}
