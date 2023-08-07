import {
  CheckboxesFieldController,
  CheckboxesFieldUIState,
} from '../../fields/controllers/checkboxes-controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, css, html } from 'lit'
import {
  customElement,
  property,
  query,
  queryAll,
  state,
} from 'lit/decorators.js'

import {
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select/multi-select-value-state'
import { FormUILayouts } from '../../form-ui/form-ui-layout'
// import { Icon } from '../icons/icon'
import 'last-icon'
import { ifDefined } from 'lit/directives/if-defined.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-checkboxes')
export class IreCheckboxesElement extends FieldElement {
  static override styles = [...FieldElement.styles, css``]

  @queryAll('input')
  inputEls!: NodeListOf<HTMLInputElement>

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: CheckboxesFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #uiState?: CheckboxesFieldUIState<any>

  // @state()
  // private _isInputFocused = false

  // @state()
  // private _areFilteredOptionsFocused = false

  // @state()
  // private _highlightedOptionIndex = -1

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe((state) => {
      this.#valueState = state
      this.requestUpdate()
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
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
            <div class="form-check">
              <input
                id="${i}"
                class="form-check-input"
                type="checkbox"
                @input=${() => this.#handleInput(i)}
                @blur=${() => this.#handleBlur()}
              />
              <label
                for="${i}"
                class="form-check-label"
              >
                ${option.label}
              </label>
            </div>
          `
        })}
      </div>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
    `
    // const touched = this.#uiState?.touched ?? false
    // const errorMessage =
    //   this.#valueState?.validationResult.errorMessage ?? undefined
    // const icon = this.#uiState?.removeIcon ?? Icon.bootstrap('x-circle-fill')
    // return html`
    //   <div class="container">
    //     ${this.#valueState?.indexes?.map((i) => {
    //       const option = this.#valueState?.options[i]
    //       if (!option) {
    //         return
    //       }
    //       // Add classMap to conditionally apply 'highlighted' class to the selected option
    //       return html`
    //         <div class="chip">
    //           ${this.#renderLabel(option, i)}
    //           <div
    //             class="remove-icon"
    //             @click=${() => this.#removeValueByOption(option)}
    //           >
    //             <l-i
    //               set="${icon.set}"
    //               name="${icon.name}"
    //               type="${ifDefined(icon.type)}"
    //             ></l-i>
    //           </div>
    //         </div>
    //       `
    //     })}
    //     <input
    //       type="text"
    //       placeholder="${'Search...'}"
    //       ?disabled="${!this.#valueState?.enabled}"
    //       @input=${this.#handleSearchInput}
    //       @click=${() => {
    //         this._isInputFocused = true
    //       }}
    //       @keydown=${this.#handleSearchKeydown}
    //       @focus=${() => {
    //         this._isInputFocused = true
    //       }}
    //       @blur=${() => {
    //         this._isInputFocused = false
    //         this.controller.markAsTouched()
    //       }}
    //     />
    //     ${this.#renderFilteredOptions()}
    //   </div>
    //   ${
    //     touched && errorMessage !== undefined
    //       ? this._renderValidationMessage(errorMessage)
    //       : undefined
    //   }
    // `
  }

  #handleInput(_: number): void {
    this.controller.valueState.indexes = [...this.inputEls]
      .filter((el) => el.checked)
      .map((el) => Number(el.id))
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
