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

      /* New styles for the highlighted option */
      .option.highlighted {
        background-color: #007bff;
        color: #fff;
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

  @state()
  private _isInputFocused = false

  @state()
  private _areFilteredOptionsFocused = false

  // Add these constants for arrow key navigation
  private ARROW_UP = 'ArrowUp'
  private ARROW_DOWN = 'ArrowDown'
  private ENTER = 'Enter'
  private ESCAPE = 'Escape'

  @state()
  private highlightedOptionIndex = -1

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

    // TODO: WHAT IS MISSING
    // ESC to close the filtered options
    // Open when arrow down or arrow up are pressed
  }

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined

    return html`
      <div class="container">
        ${this.#valueState?.indexes?.map((i) => {
          const option = this.#valueState?.options[i]
          if (!option) {
            return
          }
          // Add classMap to conditionally apply 'highlighted' class to the selected option
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
          ?disabled="${!this.#valueState?.enabled}"
          @input=${this.#handleSearchInput}
          @click=${() => {
            this._isInputFocused = true
          }}
          @keydown=${this.#handleSearchKeydown}
          @focus=${() => {
            this._isInputFocused = true
          }}
          @blur=${() => {
            this._isInputFocused = false
          }}
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
    if (!this._isInputFocused && !this._areFilteredOptionsFocused) {
      return html``
    }

    const selectedIndexes = this.#valueState?.indexes ?? []
    const availableOptions = this.#valueState?.options ?? []
    const searchQuery = this.inputEl?.value ?? ''

    const optionsToRender = availableOptions
      .map((availableOption, i) => {
        const isSelected = selectedIndexes.includes(i)
        const matchWithFilter = availableOption.label
          .toUpperCase()
          .includes(searchQuery)

        if (isSelected || !matchWithFilter) {
          return
        }

        return html`
          <div
            class="option ${classMap({
              highlighted: this.highlightedOptionIndex === i,
            })}"
            @mousedown=${(event: MouseEvent) => {
              event.preventDefault()
              event.stopPropagation()
              this.#selectOptionByIndex(i)
            }}
            @mouseenter=${() => {
              this.highlightedOptionIndex = i
            }}
          >
            ${this.#renderLabel(availableOption)}
          </div>
        `
      })
      .filter((o) => o !== undefined)

    return html`
      <div
        class="filtered-options"
        @mousedown=${() => {
          this._areFilteredOptionsFocused = true
        }}
        @focusout=${() => {
          this._areFilteredOptionsFocused = false
        }}
      >
        ${optionsToRender}
        ${
          optionsToRender.length === 0
            ? html`
              <div class="no-match">
                ${
                  selectedIndexes.length < availableOptions.length
                    ? 'No matches'
                    : 'No options'
                }
              </div>
            `
            : undefined
        }
      </div>
    `
  }

  #selectOptionByIndex(index: number): void {
    const option = this.#valueState?.options[index]
    if (option) {
      this.controller.valueState.indexes = [
        ...(this.#valueState?.indexes?.filter((i) => index !== i) ?? []),
        index,
      ]
      this.inputEl.value = ''
    }

    // Close the filtered options
    this._isInputFocused = false
    this._areFilteredOptionsFocused = false
  }

  #removeValueByOption(option: Option): void {
    const newIndexes = this.#valueState?.indexes?.filter(
      (index) => option !== this.#valueState?.options[index],
    )
    if (newIndexes) {
      this.controller.valueState.indexes = newIndexes
    }
  }

  #handleSearchInput(): void {
    this.requestUpdate()
  }

  #handleSearchKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case this.ARROW_UP:
        event.preventDefault()
        this._isInputFocused = true
        this.#highlightPreviousOption()
        break
      case this.ARROW_DOWN:
        event.preventDefault()
        this._isInputFocused = true
        this.#highlightNextOption()
        break
      case this.ENTER:
        event.preventDefault()
        this.#selectHighlightedOption()
        break
      case this.ESCAPE:
        event.preventDefault()
        this._isInputFocused = false
        break
    }
  }

  #highlightPreviousOption(): void {
    const numOptions = this.#valueState?.options.length ?? 0
    this.highlightedOptionIndex =
      (this.highlightedOptionIndex + numOptions - 1) % numOptions
    while (this.#valueState?.indexes?.includes(this.highlightedOptionIndex)) {
      this.highlightedOptionIndex--
      if (this.highlightedOptionIndex < 0) {
        this.highlightedOptionIndex = numOptions - 1
      }
    }
    this.#scrollOptionIntoView()
  }

  #highlightNextOption(): void {
    const numOptions = this.#valueState?.options.length ?? 0
    this.highlightedOptionIndex = (this.highlightedOptionIndex + 1) % numOptions
    while (
      this.#valueState?.indexes?.includes(this.highlightedOptionIndex) &&
      this.highlightedOptionIndex < numOptions - 1
    ) {
      this.highlightedOptionIndex++
    }
    this.#scrollOptionIntoView()
  }

  #scrollOptionIntoView(): void {
    const optionEl = this.#getHighlightedOptionElement()
    if (optionEl) {
      optionEl.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }

  #getHighlightedOptionElement(): HTMLElement | null {
    const options = this.shadowRoot?.querySelectorAll('.option')
    if (
      options &&
      this.highlightedOptionIndex >= 0 &&
      this.highlightedOptionIndex < options.length
    ) {
      return options[this.highlightedOptionIndex] as HTMLElement
    }
    return null
  }

  #selectHighlightedOption(): void {
    const optionEl = this.#getHighlightedOptionElement()
    if (optionEl) {
      optionEl.click()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
