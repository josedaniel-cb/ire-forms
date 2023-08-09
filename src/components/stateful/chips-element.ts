import {
  ChipsFieldController,
  ChipsFieldUIState,
} from '../../fields/controllers/chips-controller'
import {
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select/multi-select-value-state'
import { filterSelectElementCss } from '../css/filter-select-element-css'
import { Icon } from '../icons/icon'
import { FieldElement } from './base/field-element'
import './components/filter-select-element'
import 'last-icon'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-chips')
export class IreChipsElement extends FieldElement {
  static override styles = [
    ...FieldElement.styles,
    css`
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
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* https://www.npmjs.com/package/last-icon */
      l-i {
        --size: 1em;
        display: inline-flex;
        width: var(--size);
        height: var(--size);
        vertical-align: middle;
      }

      l-i svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      p l-i,
      button l-i,
      a l-i,
      span l-i {
        vertical-align: -0.125em;
      }
    `,
  ]

  @state()
  inputValue = ''

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: ChipsFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: MultiSelectFieldValueState<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #uiState?: ChipsFieldUIState<any>

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

    const icon = this.#uiState?.removeIcon ?? Icon.bootstrap('x-circle-fill')

    const availableOptionsAsEntries =
      this.#valueState?.options
        .map((option, i) => [i, option] as [number, Option])
        .filter(([i, _]) => !this.#valueState?.indexes?.includes(i)) ?? []

    return html`
      <ire-filter-select
        .enabled=${this.#valueState?.enabled ?? true}
        .removeIcon=${icon}
        .optionHtmlTemplateBuilder=${this.#uiState?.optionHtmlTemplateBuilder}
        .optionEntries=${availableOptionsAsEntries}
        @inputblur=${() => {
          this.controller.markAsTouched()
        }}
        @inputchange=${(e: CustomEvent<{ value: string }>) => {
          this.inputValue = e.detail.value
        }}
        @optionselect=${(e: CustomEvent<{ option: Option; index: number }>) => {
          this.controller.valueState.indexes = [
            ...(this.controller.valueState.indexes ?? []),
            e.detail.index,
          ]
        }}
      >
        ${this.#valueState?.indexes?.map((i) => {
          const option = this.#valueState?.options[i]
          if (!option) {
            return
          }
          // Add classMap to conditionally apply 'highlighted' class to the selected option
          return html`
            <div class="chip">
              ${this.#renderLabel(option, i)}
              <div
                class="remove-icon"
                @click=${() => this.#removeValueByOption(option)}
              >
                <l-i
                  set="${icon.set}"
                  name="${icon.name}"
                  type="${ifDefined(icon.type)}"
                ></l-i>
              </div>
            </div>
          `
        })}
      </ire-filter-select>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
    `
  }

  #renderLabel(option: Option, index: number) {
    if (this.#uiState?.optionHtmlTemplateBuilder) {
      return this.#uiState?.optionHtmlTemplateBuilder(option, index)
    }
    return option.label
  }
  #removeValueByOption(option: Option): void {
    const newIndexes = this.#valueState?.indexes?.filter(
      (index) => option !== this.#valueState?.options[index],
    )
    if (newIndexes) {
      this.controller.valueState.indexes = newIndexes
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-chips': IreChipsElement
  }
}
