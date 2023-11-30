import { SelectOption } from '../../../fields/controllers/multi-select/multi-select-value-state'
import { baseCss } from '../../css/base-css'
import { Icon } from '../../icons/icon'
import { ControlValidationUiStateClassName } from '../../validation/control-validation-ui-state'
import { bootstrapCss2 } from '../bootstrap2'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-filter-select')
export class IreFilterSelectElement extends LitElement {
  static override styles = [
    bootstrapCss2,
    baseCss, // required because of .hidden
    css`
      .form-control {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        align-items: center;
      }

      input[type='text'] {
        flex: 1;
        border: none;
        outline: none;
        background-color: transparent;
        line-height: 1.25rem;
        font-size: 0.875rem;
        color: var(--bs-body-color);
        min-width: 25px;
      }

      input[type='text']::placeholder {
        color: var(--bs-secondary);
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
        border: 1px solid var(--bs-border-color);
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
        background-color: var(--bs-blue);
        color: white;
      }
    `,
  ]

  @property()
  enabled!: boolean

  @property()
  validationState!: ControlValidationUiStateClassName

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

  @state()
  private _isInputFocused = false

  @state()
  private _areFilteredOptionsFocused = false

  @state()
  private _highlightedOptionIndex = -1

  override render(): HTMLTemplateResult {
    return html`
      <div
        class="form-control iconized-control ${this.validationState}"
      >
        <slot></slot>
        <input
          class="iconized-control__input"
          type="text"
          placeholder="${'placeholder'}"
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
            this.dispatchEvent(new CustomEvent('inputblur'))
          }}
        />
        ${this.#renderIcons()}
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

    const searchQuery = this.inputEl?.value ?? ''
    const availableOptionEntries = this.optionEntries.filter(([_, option]) => {
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

  #renderIcons() {
    // Define the icons to show
    const icons = [
      { icon: Icon.bootstrap('exclamation-circle') },
      { icon: Icon.bootstrap('check-circle') },
    ]

    // Determine which icon to show
    let selectedIndex: number | null = null
    if (this.validationState === ControlValidationUiStateClassName.IsInvalid) {
      selectedIndex = icons.length - 2
    } else if (
      this.validationState === ControlValidationUiStateClassName.IsValid
    ) {
      selectedIndex = icons.length - 1
    }

    // Render all icons, but show only the selected one
    const htmlIcons = icons.map((icon, i) => {
      return html`
        <ire-last-icon-wrapper
          class="iconized-control__icon ${classMap({
            hidden: selectedIndex !== i,
          })}"
          .params=${icon.icon}
        ></ire-last-icon-wrapper>
      `
    })

    return htmlIcons
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

  #handleSearchInput(): void {
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

    // Decrement the index and wrap around if needed
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex - 1 + numOptions) % numOptions

    // Scroll the option into view
    this.#scrollOptionIntoView()
  }

  #highlightNextOption(): void {
    // Get the number of options.
    const numOptions = this.optionEntries.length ?? 0

    // Increment the index, and wrap around if necessary.
    this._highlightedOptionIndex =
      (this._highlightedOptionIndex + 1) % numOptions

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
