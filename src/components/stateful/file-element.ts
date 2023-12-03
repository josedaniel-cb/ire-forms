import {
  FileFieldController,
  FileFieldUIState,
  FileFieldValueState,
} from '../../fields/controllers/file-controller'
import { baseCss } from '../css/base-css'
import { Icon } from '../icons/icon'
import {
  ControlValidationUiState,
  ControlValidationUiStateClassName,
} from '../validation/control-validation-ui-state'
import { FieldElement } from './base/field-element'
import { bootstrapCss2 } from './bootstrap2'
import './components/input-element'
import { IreInputElement } from './components/input-element'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-file')
export class IreFileElement extends FieldElement {
  static override styles = [
    baseCss,
    bootstrapCss2,
    css`
      /* .btn-outline-secondary {
        --bs-btn-color: #6c757d;
        --bs-btn-border-color: #6c757d;
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #6c757d;
        --bs-btn-hover-border-color: #6c757d;
        --bs-btn-focus-shadow-rgb: 108,117,125;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #6c757d;
        --bs-btn-active-border-color: #6c757d;
        --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        --bs-btn-disabled-color: #6c757d;
        --bs-btn-disabled-bg: transparent;
        --bs-btn-disabled-border-color: #6c757d;
        --bs-gradient: none;
      } */

      .input-group:hover .btn {
        color: var(--bs-btn-hover-color);
        background-color: var(--bs-btn-hover-bg);
        border-color: var(--bs-btn-hover-border-color);
      }

      /* .input-group:hover, .input-group:active {
        box-shadow: 0 0 0 0.25rem rgba(var(--bs-primary-rgb), 0.25);
      } */

      .form-control {
        cursor: pointer;
        caret-color: transparent;
      }
    `,
  ]

  @query('input[type=file]')
  fileInputEl!: HTMLInputElement

  @query('input[type=text]')
  textInputEl!: HTMLInputElement

  @query('button')
  buttonEl!: HTMLButtonElement

  @property({ attribute: false })
  override controller!: FileFieldController

  @state()
  protected _showPassword = false

  #valueState?: FileFieldValueState

  #uiState?: FileFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    const isInvalid = errorMessage !== undefined

    const validationState = ControlValidationUiState.className({
      touched,
      isInvalid,
    })

    // return html`
    //   <ire-input
    //     class="${validationState}"
    //     .type=${this._showPassword ? 'text' : inputType}
    //     .placeholder=${this.#uiState?.placeholder ?? undefined}
    //     .validationState=${validationState}
    //     .enabled=${this.#valueState?.enabled ?? true}
    //     .max=${this.#uiState?.max ?? undefined}
    //     .maxLength=${this.#uiState?.maxLength ?? undefined}
    //     .min=${this.#uiState?.min ?? undefined}
    //     .minLength=${this.#uiState?.minLength ?? undefined}
    //     .step=${this.#uiState?.step ?? undefined}
    //     .leadingIcons=${
    //       inputType === 'password'
    //         ? [
    //             {
    //               icon: Icon.bootstrap('eye-slash'),
    //               onClick: () => {
    //                 this._showPassword = !this._showPassword
    //               },
    //             },
    //             {
    //               icon: Icon.bootstrap('eye'),
    //               onClick: () => {
    //                 this._showPassword = !this._showPassword
    //               },
    //             },
    //           ]
    //         : undefined
    //     }
    //     .selectedIconIndex=${
    //       inputType === 'password' ? (this._showPassword ? 0 : 1) : undefined
    //     }
    //     @inputchange=${(e: CustomEvent<{ value: string }>) => {
    //       this.controller.value = e.detail.value
    //     }}
    //     @inputblur=${() => {
    //       this.controller.markAsTouched()
    //     }}
    //   ></ire-input>
    //   ${
    //     validationState === ControlValidationUiStateClassName.IsInvalid
    //       ? // rome-ignore lint/style/noNonNullAssertion: any is required here
    //         this._renderValidationMessage(errorMessage!)
    //       : undefined
    //   }
    // `
    return html`
      <input
        class="hidden"
        type="file"
        accept="${ifDefined(this.#uiState?.accept ?? undefined)}"
        capture="${ifDefined(this.#uiState?.capture ?? undefined)}"
        ?multiple="${!(this.#uiState?.multiple ?? true) ? true : undefined}"
        ?disabled="${!(this.#valueState?.enabled ?? true) ? true : undefined}"
      />
      <div
        class="input-group"
        @click=${(event: Event) => {
          event.preventDefault()
          this.fileInputEl.click()
        }}
      >
        <button
          class="btn btn-outline-secondary"
          type="button"
          ?disabled="${!(this.#valueState?.enabled ?? true) ? true : undefined}"
          @click=${(event: Event) => {
            // event.preventDefault()
            // this.fileInputEl.click()
          }}
        >
          ${this.#uiState?.buttonText ?? 'Choose File'}
        </button>
        <!-- <input
          class="form-control"
          type="text"
          placeholder="${ifDefined(
            this.#uiState?.placeholder ?? 'No file chosen',
          )}"
          @click=${(event: Event) => {
            event.preventDefault()
          }}
          @input=${(event: Event) => {
            event.preventDefault()
          }}
        /> -->
        <div
          class="form-control"
          type="text"
          tabindex="0"
          style="color: var(--bs-secondary-color);"
        >
          ${this.#uiState?.placeholder ?? 'No file chosen'}
        </div>
      </div>
    `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
      // this.el.value = state.value
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
    'ire-file': IreFileElement
  }
}
