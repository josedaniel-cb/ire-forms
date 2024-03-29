import {
  NativeSelectFieldController,
  NativeSelectFieldUIState,
} from '../../fields/controllers/native-select-controller'
import { SelectFieldValueState } from '../../fields/controllers/select/select-value-state'
// import { formControlsCss } from '../css/form-controls-css'
// import { formFieldCss } from '../css/form-field-css'
import { iconizedControlCss } from '../css/iconized-control-css'
import { layoutsCss } from '../css/layout-css'
import { Icon } from '../icons/icon'
import {
  ControlValidationUiState,
  ControlValidationUiStateClassName,
} from '../validation/control-validation-ui-state'
import { FieldElement } from './base/field-element'
import { bootstrapCss2 } from './bootstrap2'
import './components/last-icon-wrapper-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ire-native-select')
export class IreNativeSelectElement extends FieldElement {
  static override styles = [
    layoutsCss,
    // formFieldCss,
    // formControlsCss,
    bootstrapCss2,
    iconizedControlCss,
  ]

  @query('select')
  selectEl!: HTMLSelectElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: NativeSelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: SelectFieldValueState<any>

  #uiState?: NativeSelectFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = errorMessage !== undefined
    const touched = this.#uiState?.touched ?? false

    const validationState = ControlValidationUiState.className({
      isInvalid,
      touched,
    })
    console.log({
      // validationResult: this.#valueState?.validationResult,
      validationState,
    })
    return html`
      <div class="iconized-control">
        <select
          class="
            form-select
            iconized-control__input
            ${validationState}
            ${
              this.#valueState?.index === null ? 'form-select--placeholder' : ''
            }
          "
          ?disabled="${!(this.#valueState?.enabled ?? true)}"
          @input="${this.#handleInput}"
          @blur="${this.#handleBlur}"
        >
          <option hidden>
            ${
              this.#uiState?.placeholder
                ? this.#uiState.placeholder
                : 'Choose an option'
            }
          </option>
          ${this.#valueState?.options.map(
            ({ label }, index) => html`
              <option value="${index}">${label}</option>
            `,
          )}
        </select>
        <!-- <ire-last-icon-wrapper
          class="iconized-control__icon"
          .params=${
            isInvalid
              ? Icon.bootstrap('exclamation-triangle-fill')
              : Icon.bootstrap('chevron-down')
          }
        ></ire-last-icon-wrapper> -->
        <ire-last-icon-wrapper
          class="iconized-control__icon"
          .params=${
            validationState === ControlValidationUiStateClassName.IsValid
              ? Icon.bootstrap('check-circle')
              : validationState === ControlValidationUiStateClassName.IsInvalid
              ? Icon.bootstrap('exclamation-circle')
              : Icon.bootstrap('chevron-down')
          }
        ></ire-last-icon-wrapper>
      </div>
      ${
        validationState === ControlValidationUiStateClassName.IsInvalid
          ? // rome-ignore lint/style/noNonNullAssertion: any is required here
            this._renderValidationMessage(errorMessage!)
          : undefined
      }
      `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
      if (state.index !== null) {
        this.selectEl.selectedIndex = state.index + 1 // Add 1 to skip the placeholder
      } else {
        this.selectEl.selectedIndex = 0
      }
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe(async (state) => {
      this.#uiState = state
      this.requestUpdate()
      await this.updateComplete
    })
  }

  #handleInput(_: Event): void {
    if (!this.#valueState) return
    const selectedIndex = this.selectEl.selectedIndex - 1 // Omit the placeholder
    this.controller.valueState.index = selectedIndex
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-native-select': IreNativeSelectElement
  }
}
