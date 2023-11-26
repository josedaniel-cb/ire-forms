import {
  ChipsFieldController,
  ChipsFieldUIState,
} from '../../fields/controllers/chips-controller'
import {
  MultiSelectFieldValueState,
  SelectOption,
} from '../../fields/controllers/multi-select/multi-select-value-state'
import { formControlsCss } from '../css/form-controls-css'
import { formFieldCss } from '../css/form-field-css'
import { layoutsCss } from '../css/layout-css'
import { Icon } from '../icons/icon'
import {
  ControlValidationUiState,
  ControlValidationUiStateClassName,
} from '../validation/control-validation-ui-state'
import { FieldElement } from './base/field-element'
import { bootstrapCss2 } from './bootstrap2'
import './components/filter-select-element'
import './components/last-icon-wrapper-element'
import 'last-icon'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

// rome-ignore lint/suspicious/noExplicitAny: any is required here
type Option = SelectOption<any>

@customElement('ire-chips')
export class IreChipsElement extends FieldElement {
  static override styles = [
    layoutsCss,
    // formFieldCss,
    // formControlsCss,
    bootstrapCss2,
    css`
      /* Styles for the chips of selected elements */
      .chip {
        display: flex;
        align-items: center;
        /* padding: 2px 8px; */
        padding: 0 0.5em;
        /* background-color: #007bff;
        color: #fff;
        border-radius: 16px; */
      }

      /* Styles for the "x" icon inside the chips */
      .chip .remove-icon {
        margin-left: 4px;
        cursor: pointer;
        /* display: flex;
        align-items: center;
        justify-content: center; */
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

  protected _renderField(): HTMLTemplateResult {
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = errorMessage !== undefined
    const touched = this.#uiState?.touched ?? false
    const validationState = ControlValidationUiState.className({
      isInvalid,
      touched,
    })

    const icon = this.#uiState?.removeIcon ?? Icon.bootstrap('x-circle')

    const availableOptionsAsEntries =
      this.#valueState?.options
        .map((option, i) => [i, option] as [number, Option])
        .filter(([i, _]) => !this.#valueState?.indexes?.includes(i)) ?? []

    return html`
      <ire-filter-select
        class="${validationState}"
        .enabled=${this.#valueState?.enabled ?? true}
        .validationState=${validationState}
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
            <!-- <div class="chip">
              ${this.#renderLabel(option, i)}
              <div
                class="remove-icon"
                @click=${() => this.#removeValueByOption(option)}
              >
                <ire-last-icon-wrapper .params=${icon}></ire-last-icon-wrapper>
              </div>
            </div> -->
            <span class="rounded-pill text-bg-primary chip">
              <strong><small>${this.#renderLabel(option, i)}</small></strong>
              <!-- <button type="button" class="btn btn-outline-danger">
                <ire-last-icon-wrapper .params=${icon}></ire-last-icon-wrapper>
              </button> -->
              <div
                class="remove-icon"
                @click=${() => this.#removeValueByOption(option)}
              >
                <ire-last-icon-wrapper .params=${icon}></ire-last-icon-wrapper>
              </div>
            </span>
          `
        })}
      </ire-filter-select>
      ${
        validationState === ControlValidationUiStateClassName.IsInvalid
          ? // rome-ignore lint/style/noNonNullAssertion: any is required here
            this._renderValidationMessage(errorMessage!)
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
