import {
  TextAreaFieldController,
  TextAreaFieldUIState,
  TextAreaFieldValueState,
} from '../../fields/controllers/text-area-controller'
import { formControlsCss } from '../css/form-controls-css'
import { formFieldCss } from '../css/form-field-css'
import { iconizedControlCss } from '../css/iconized-control-css'
import { layoutsCss } from '../css/layout-css'
import { Icon } from '../icons/icon'
import { FieldElement } from './base/field-element'
import './components/input-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-text-area')
export class IreTextAreaElement extends FieldElement {
  static override styles = [
    layoutsCss,
    formFieldCss,
    formControlsCss,
    iconizedControlCss,
  ]

  @query('textarea')
  textareaEl?: HTMLTextAreaElement

  @property({ attribute: false })
  override controller!: TextAreaFieldController

  @state()
  protected _showPassword = false

  #valueState?: TextAreaFieldValueState

  #uiState?: TextAreaFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = touched && errorMessage !== undefined
    return html`
      <div class="iconized-control">
        <textarea
          class="form-textarea iconized-control__input ${classMap({
            'is-invalid': isInvalid,
          })}"
          placeholder=${ifDefined(this.#uiState?.placeholder ?? undefined)}
          ?disabled=${this.#valueState?.enabled ?? true}
          maxlength=${ifDefined(this.#uiState?.maxLength ?? undefined)}
          minlength=${ifDefined(this.#uiState?.minLength ?? undefined)}
          cols=${ifDefined(this.#uiState?.cols ?? undefined)}
          rows=${ifDefined(this.#uiState?.rows ?? undefined)}
          wrap=${ifDefined(this.#uiState?.wrap ?? undefined)}
          resize=${ifDefined(this.#uiState?.resize ?? undefined)}
          @input=${() => {
            this.controller.value = this.textareaEl?.value ?? ''
          }}
          @blur=${() => {
            this.controller.markAsTouched()
          }}
        ></textarea>
        ${
          isInvalid
            ? html`
              <ire-last-icon-wrapper
                class="iconized-control__icon"
                .params=${Icon.bootstrap('exclamation-triangle-fill')}
              ></ire-last-icon-wrapper>
            `
            : undefined
        }
      </div>
      ${isInvalid ? this._renderValidationMessage(errorMessage) : undefined}
    `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
      if (this.textareaEl) this.textareaEl.value = state.value
      else console.error('textareaEl is undefined')
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
    'ire-text-area': IreTextAreaElement
  }
}
