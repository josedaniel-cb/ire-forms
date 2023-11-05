import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/controllers/text-controller'
import { formControlsCss } from '../css/form-controls-css'
import { formFieldCss } from '../css/form-field-css'
import { layoutsCss } from '../css/layout-css'
import { Icon } from '../icons/icon'
import { FieldElement } from './base/field-element'
import { bootstrapCss2 } from './bootstrap2'
import './components/input-element'
import { IreInputElement } from './components/input-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ire-text')
export class IreTextElement extends FieldElement {
  static override styles = [layoutsCss, bootstrapCss2]

  @query('ire-input')
  ireInputEl!: IreInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  @state()
  protected _showPassword = false

  #valueState?: TextFieldValueState

  #uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = touched && errorMessage !== undefined
    const inputType = this.#uiState?.inputType ?? undefined
    return html`
      <ire-input
        class="${classMap({ 'is-invalid': isInvalid })}"
        .type=${this._showPassword ? 'text' : inputType}
        .placeholder=${this.#uiState?.placeholder ?? undefined}
        .isInvalid=${isInvalid}
        .enabled=${this.#valueState?.enabled ?? true}
        .max=${this.#uiState?.max ?? undefined}
        .maxLength=${this.#uiState?.maxLength ?? undefined}
        .min=${this.#uiState?.min ?? undefined}
        .minLength=${this.#uiState?.minLength ?? undefined}
        .step=${this.#uiState?.step ?? undefined}
        .leadingIcon=${
          inputType === 'password'
            ? {
                icon: this._showPassword
                  ? Icon.bootstrap('eye-slash')
                  : Icon.bootstrap('eye'),
                onClick: () => {
                  this._showPassword = !this._showPassword
                },
              }
            : undefined
        }
        @inputchange=${(e: CustomEvent<{ value: string }>) => {
          this.controller.value = e.detail.value
        }}
        @inputblur=${() => {
          this.controller.markAsTouched()
        }}
      ></ire-input>
      ${isInvalid ? this._renderValidationMessage(errorMessage) : undefined}
    `
  }

  // override connectedCallback(): void {
  //   super.connectedCallback()
  //   // this.controller.connect(this)
  //   this.ireInputEl.inputEl
  //   console.log(
  //     '🚀 ~ file: text-element.ts:78 ~ IreTextElement ~ overrideconnectedCallback ~ this.ireInputEl.inputEl:',
  //     this.ireInputEl.inputEl,
  //   )
  // }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
      this.ireInputEl.inputEl.value = state.value
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe(async (state) => {
      this.#uiState = state
      this.requestUpdate()
      await this.updateComplete
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-text': IreTextElement
  }
}
