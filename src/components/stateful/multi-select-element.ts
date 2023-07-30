import {
  MultiSelectFieldController,
  MultiSelectFieldUIState,
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select-controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined'
import { styleMap } from 'lit/directives/style-map.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-multi-select')
export class IreMultiSelectElement extends FieldElement {
  static override styles = [
    ...FieldElement.styles,
    css`
      /* Styles for the ire-multi-select */
      .container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
        border: 1px solid #ced4da;
        border-radius: 4px;
        padding: 4px;
        background-color: #f7f7f7;
      }

      /* Styles for the chips of selected elements */
      .chip {
        display: flex;
        align-items: center;
        padding: 2px 8px;
        background-color: #007bff;
        color: #fff;
        border-radius: 16px;
      }

      /* Styles for the "x" icon inside the chips */
      .chip .remove-icon {
        margin-left: 4px;
        cursor: pointer;
      }

      /* Styles for the input search */
      input[type='text'] {
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
      }

      /* Styles for the filtered options */
      .filtered-options {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 1;
      }

      /* Styles for each option in the filtered options */
      .option {
        padding: 8px;
        cursor: pointer;
      }

      .option:hover {
        background-color: #f1f1f1;
      }

      .no-match {
        padding: 8px;
        text-align: center;
        color: #888;
      }
    `,
  ]

  @query('input')
  inputEl!: HTMLInputElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: MultiSelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #uiState?: MultiSelectFieldUIState<any>

  @query('.filtered-options')
  private filteredOptionsEl!: HTMLElement

  @state()
  private isInputFocused = false

  @state()
  private areFilteredOptionsFocused = false

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

    // Subscribe to focus changes on the input element
    this.inputEl.addEventListener('focus', () => {
      this.isInputFocused = true
    })

    this.inputEl.addEventListener('blur', () => {
      this.isInputFocused = false
    })

    // Subscribe to focus changes on the filtered options container
    this.filteredOptionsEl.addEventListener('mousedown', (event) => {
      this.areFilteredOptionsFocused = true
    })

    this.filteredOptionsEl.addEventListener('focusout', () => {
      this.areFilteredOptionsFocused = false
    })
  }

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined

    return html`
      <div class="container">
        ${this.#valueState?.index?.map((i) => {
          const option = this.#valueState?.options[i]
          if (!option) {
            return
          }
          return html`
            <div class="chip">
              ${this.#renderLabel(option)}
              <span class="remove-icon" @click=${() =>
                this.#removeValueByOption(option)}>x</span>
            </div>
          `
        })}
        <input
          type="text"
          placeholder="${'Search...'}"
          @input=${this.#handleSearchInput}
          ?disabled="${!(this.#valueState?.enabled ?? true)}"
        />
        ${this.#renderFilteredOptions()}
      </div>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
    `
  }

  #renderLabel(option: Option) {
    if (this.#uiState?.optionHtmlTemplateBuilder) {
      return this.#uiState?.optionHtmlTemplateBuilder(option)
    }
    return option.label
  }

  #renderFilteredOptions(): HTMLTemplateResult {
    if (!this.isInputFocused && !this.areFilteredOptionsFocused) {
      return html``
    }

    const index = this.#valueState?.index ?? []
    const options = this.#valueState?.options ?? []
    const inputValue = this.inputEl?.value ?? ''
    const optionsToRender = options
      .map((option, i) => {
        const isNotSelected = !index.includes(i)
        const matchWithFilter = option.label.toUpperCase().includes(inputValue)
        const show = isNotSelected && matchWithFilter
        if (!show) {
          return
        }
        return html`
        <div class="option" @mousedown=${() => this.#selectOptionByIndex(i)}>
          ${this.#renderLabel(option)}
        </div>
      `
      })
      .filter((o) => o !== undefined)

    return html`
      <div class="filtered-options">
        ${optionsToRender}
        ${
          optionsToRender.length === 0
            ? html`
              <div class="no-match">
                ${index.length < options.length ? 'No matches' : 'No options'}
              </div>`
            : undefined
        }
      </div>
    `
  }

  #selectOptionByIndex(index: number): void {
    const option = this.#valueState?.options[index]
    if (option) {
      this.controller.valueState.index = [
        ...(this.#valueState?.index?.filter((i) => index !== i) ?? []),
        index,
      ]
      this.inputEl.value = ''
    }
  }

  #removeValueByOption(option: Option): void {
    const newIndexes = this.#valueState?.index?.filter(
      (index) => option !== this.#valueState?.options[index],
    )
    if (newIndexes) {
      this.controller.valueState.index = newIndexes
    }
  }

  #handleSearchInput(): void {
    this.requestUpdate()
  }

  override connectedCallback(): void {
    super.connectedCallback()
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
