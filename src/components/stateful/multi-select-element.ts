import {
  MultiSelectFieldController,
  MultiSelectFieldUIState,
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select-controller'
import { FieldElement } from './base/field-element'
import { multiSelectElementCss } from './multi-select-element-css'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import 'last-icon'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-multi-select')
export class IreMultiSelectElement extends FieldElement {
  static override styles = [...FieldElement.styles, multiSelectElementCss]

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

  @state()
  private _highlightedOptionIndex = -1

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
              <div
                class="remove-icon"
                @click=${() => this.#removeValueByOption(option)}
              >
                <l-i set="bs" name="x-circle-fill"></l-i>
              </div>
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
            this.controller.markAsTouched()
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
    const allOptions = this.#valueState?.options ?? []
    const searchQuery = this.inputEl?.value ?? ''
    const availableOptionEntries = allOptions
      .map<[number, Option]>((option, i) => [i, option])
      .filter(([i, option]) => {
        const isSelected = selectedIndexes.includes(i)
        const matchWithFilter = option.label.toUpperCase().includes(searchQuery)
        return !isSelected && matchWithFilter
      })

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
        ${availableOptionEntries.map(([i, option]) => {
          return html`
          <div
            class="option ${classMap({
              highlighted: this._highlightedOptionIndex === i,
            })}"
            @mousedown=${(event: MouseEvent) => {
              event.preventDefault()
              event.stopPropagation()
              this.#selectOptionByIndex(i)
            }}
            @mouseenter=${() => {
              this._highlightedOptionIndex = i
            }}
          >
            ${this.#renderLabel(option)}
          </div>
        `
        })}
        ${
          availableOptionEntries.length === 0
            ? html`
              <div class="no-match">
                ${
                  selectedIndexes.length < allOptions.length
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
        // Remove any indexes that are already in the array
        ...(this.#valueState?.indexes?.filter((i) => index !== i) ?? []),
        // Add the new index to the end of the array
        index,
      ]
      this.inputEl.value = ''
    }

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
      case 'ArrowUp':
        event.preventDefault()
        this._isInputFocused = true
        this.#highlightPreviousOption()
        break
      case 'ArrowDown':
        event.preventDefault()
        this._isInputFocused = true
        this.#highlightNextOption()
        break
      case 'Enter':
        event.preventDefault()
        this.#selectOptionByIndex(this._highlightedOptionIndex)
        break
      case 'Escape':
        event.preventDefault()
        this._isInputFocused = false
        break
    }
  }

  #highlightPreviousOption(): void {
    // Get the number of options
    const numOptions = this.#valueState?.options.length ?? 0

    // Decrement the index and wrap around if needed
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex + numOptions - 1) % numOptions

    // If the index points to an option that is disabled, decrement again
    while (this.#valueState?.indexes?.includes(this._highlightedOptionIndex)) {
      this._highlightedOptionIndex--
      if (this._highlightedOptionIndex < 0) {
        this._highlightedOptionIndex = numOptions - 1
      }
    }

    // Scroll the option into view
    this.#scrollOptionIntoView()
  }

  #highlightNextOption(): void {
    // Get the number of options.
    const numOptions = this.#valueState?.options.length ?? 0

    // Increment the index, and wrap around if necessary.
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex + 1) % numOptions

    // If the option is hidden, skip it.
    while (
      this.#valueState?.indexes?.includes(this._highlightedOptionIndex) &&
      this._highlightedOptionIndex < numOptions - 1
    ) {
      this._highlightedOptionIndex++
    }

    // Scroll the option into view.
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
      this._highlightedOptionIndex >= 0 &&
      this._highlightedOptionIndex < options.length
    ) {
      return options[this._highlightedOptionIndex] as HTMLElement
    }
    return null
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
