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
    `,
  ]

  @query('input')
  inputEl!: HTMLInputElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: MultiSelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  #uiState?: MultiSelectFieldUIState

  @state()
  private isInputFocused = false

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

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    // const selectedValues = this.#valueState?.value ?? []
    const selectedOptions =
      this.#valueState?.index?.map((i) => this.#valueState?.options[i]) ?? []

    return html`
      <div class="container">
        ${selectedOptions.map(
          (option) => html`
            <div class="chip">
              ${option?.label}
              <span class="remove-icon" @click=${() =>
                this.#removeValue(option)}>x</span>
            </div>
          `,
        )}
        <input
          type="text"
          placeholder="Search..."
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

  #renderFilteredOptions(): HTMLTemplateResult {
    if (!this.isInputFocused) {
      return html`` // Don't render filtered options if input is not focused
    }

    const index = this.#valueState?.index ?? []
    const options = this.#valueState?.options ?? []
    // const unselectedOptions = options.filter((_, i) => !index.includes(i))
    const inputValue = this.inputEl?.value ?? ''
    // const filteredOptions =
    //   inputValue !== ''
    //     ? unselectedOptions.filter((o) => {
    //         const match = o.label.toUpperCase().includes(inputValue)
    //         return match
    //       })
    //     : unselectedOptions
    const optionsToRender = options
      .map((option, i) => {
        const isNotSelected = !index.includes(i)
        const match = option.label.toUpperCase().includes(inputValue)
        const show = isNotSelected && match
        if (!show) {
          return
        }
        return html`
        <div class="option" @click=${() => this.#selectOption(option)}>
          ${option.label}
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
              <div>
                ${index.length < options.length ? 'No matches' : 'No options'}
              </div>`
            : undefined
        }
      </div>
    `
  }

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #selectOption(option: any): void {
    // console.log(
    //   '🚀 ~ file: multi-select-element.ts:171 ~ IreMultiSelectElement ~ #selectOption ~ option:',
    //   option,
    // )
    const newValues = [...(this.#valueState?.value ?? []), option.value]
    console.log(
      '🚀 ~ file: multi-select-element.ts:176 ~ IreMultiSelectElement ~ #selectOption ~ newValues:',
      newValues,
    )
    this.controller.valueState.value = newValues
    this.inputEl.value = '' // Clear the input after selecting an option
    this.isInputFocused = false
  }

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #removeValue(value: any): void {
    const newValues = this.#valueState?.value.filter((v) => v !== value) ?? []
    this.controller.valueState.value = newValues
  }

  #handleSearchInput(event: Event): void {
    this.requestUpdate()
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('mousedown', this.#handleThisClick)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('mousedown', this.#handleThisClick)
  }

  #handleThisClick = (event: MouseEvent): void => {
    this.isInputFocused = this.contains(event.target as Node)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
