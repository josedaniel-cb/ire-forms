import { SelectOption } from '../../fields/controllers/multi-select/multi-select-value-state'
import { multiSelectElementCss } from '../css/multi-select-element-css'
import { Icon } from '../icons/icon'
import { FieldElement } from './base/field-element'
import 'last-icon'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-filter-select')
export class IreFilterSelectElement extends LitElement {
  static override styles = [...FieldElement.styles, multiSelectElementCss]

  // @property()
  // touched = false

  @property()
  enabled!: boolean

  @property()
  removeIcon!: Icon

  @property()
  optionHtmlTemplateBuilder?: (
    option: Option,
    index: number,
  ) => HTMLTemplateResult

  @property()
  optionEntries!: [number, Option][]

  @query('input')
  inputEl!: HTMLInputElement

  // @property({ attribute: false })
  // // rome-ignore lint/suspicious/noExplicitAny: any is required here
  // override controller!: ChipsFieldController<any>

  // // rome-ignore lint/suspicious/noExplicitAny: any is required here
  // #valueState?: MultiSelectFieldValueState<any>

  // // rome-ignore lint/suspicious/noExplicitAny: any is required here
  // #uiState?: ChipsFieldUIState<any>

  @state()
  private _isInputFocused = false

  @state()
  private _areFilteredOptionsFocused = false

  @state()
  private _highlightedOptionIndex = -1

  // override firstUpdated(): void {
  //   this.controller.connect(this)

  //   // Subscribe to value and validation changes
  //   this.controller.valueStateChanges.subscribe((state) => {
  //     this.#valueState = state
  //     this.requestUpdate()
  //   })

  //   // Subscribe to UI changes
  //   this.controller.uiStateChanges.subscribe((state) => {
  //     this.#uiState = state
  //     this.requestUpdate()
  //   })
  // }

  override render(): HTMLTemplateResult {
    return html`
      <div class="container">
        <slot></slot>
        <input
          type="text"
          placeholder="${'Search...'}"
          ?disabled="${!this.enabled}"
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
            // this.controller.markAsTouched()
            this.dispatchEvent(new CustomEvent('inputblur'))
          }}
        />
        ${this.#renderFilteredOptions()}
      </div>
    `
  }

  #renderLabel(option: Option, index: number) {
    if (this.optionHtmlTemplateBuilder) {
      return this.optionHtmlTemplateBuilder(option, index)
    }
    return option.label
  }

  #renderFilteredOptions(): HTMLTemplateResult {
    if (!this._isInputFocused && !this._areFilteredOptionsFocused) {
      return html``
    }

    // const selectedIndexes = this.#valueState?.indexes ?? []
    // const allOptions = this.#valueState?.options ?? []
    const searchQuery = this.inputEl?.value ?? ''
    const availableOptionEntries = this.optionEntries.filter(([_, option]) => {
      // const isSelected = selectedIndexes.includes(i)
      const matchWithFilter = option.label.toUpperCase().includes(searchQuery)
      return matchWithFilter
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
        ${availableOptionEntries.map(([_, option], i) => {
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
            ${this.#renderLabel(option, i)}
          </div>
        `
        })}
        ${
          availableOptionEntries.length === 0
            ? html`
              <div class="no-match">
                ${this.optionEntries.length > 0 ? 'No matches' : 'No options'}
              </div>
            `
            : undefined
        }
      </div>
    `
  }

  #selectOptionByIndex(index: number): void {
    const optionEntry = this.optionEntries[index]
    this.dispatchEvent(
      new CustomEvent('optionselect', {
        detail: { option: optionEntry[1], index: optionEntry[0] },
        bubbles: true,
        composed: true,
      }),
    )
    this.inputEl.value = ''

    this._isInputFocused = false
    this._areFilteredOptionsFocused = false
  }

  // #removeValueByOption(option: Option): void {
  //   const newIndexes = this.#valueState?.indexes?.filter(
  //     (index) => option !== this.#valueState?.options[index],
  //   )
  //   if (newIndexes) {
  //     this.controller.valueState.indexes = newIndexes
  //   }
  // }

  #handleSearchInput(): void {
    // this.requestUpdate()
    this.dispatchEvent(
      new CustomEvent('inputchange', {
        detail: {
          value: this.inputEl.value,
        },
        bubbles: true,
        composed: true,
      }),
    )
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
    const numOptions = this.optionEntries.length ?? 0
    console.log(
      '🚀 ~ file: base-select-element.ts:234 ~ IreFilterSelectElement ~ #highlightPreviousOption ~ numOptions:',
      {
        numOptions,
        'this._highlightedOptionIndex': this._highlightedOptionIndex,
      },
    )

    // Decrement the index and wrap around if needed
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex - 1 + numOptions) % numOptions

    // // If the index points to an option that is disabled, decrement again
    // while (this.#valueState?.indexes?.includes(this._highlightedOptionIndex)) {
    // this._highlightedOptionIndex--
    // if (this._highlightedOptionIndex < 0) {
    //   this._highlightedOptionIndex = numOptions - 1
    // }
    // }

    // Scroll the option into view
    this.#scrollOptionIntoView()
  }

  #highlightNextOption(): void {
    // Get the number of options.
    const numOptions = this.optionEntries.length ?? 0

    // Increment the index, and wrap around if necessary.
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex + 1) % numOptions

    // // If the option is hidden, skip it.
    // while (
    //   this.#valueState?.indexes?.includes(this._highlightedOptionIndex) &&
    //   this._highlightedOptionIndex < numOptions - 1
    // ) {
    //   this._highlightedOptionIndex++
    // }

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
    'ire-filter-select': IreFilterSelectElement
  }
}
