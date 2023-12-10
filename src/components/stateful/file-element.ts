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
      .input-group {
        cursor: pointer
      }

      .input-group:hover .btn {
        color: var(--bs-btn-hover-color);
        background-color: var(--bs-btn-hover-bg);
        border-color: var(--bs-btn-hover-border-color);
      }

      .form-control {
        /* cursor: pointer; */
        /* caret-color: transparent; */
        color: var(--bs-secondary-color);
      }
    `,
  ]

  @query('input[type=file]')
  fileInputEl!: HTMLInputElement

  // @query('input[type=text]')
  // textInputEl!: HTMLInputElement

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
        ?multiple="${this.#uiState?.multiple ?? false ? true : undefined}"
        ?disabled="${!(this.#valueState?.enabled ?? true) ? true : undefined}"
        @input=${(event: Event) => {
          if (this.fileInputEl.files === null) {
            return
          }
          event.preventDefault()
          this.controller.value = [...this.fileInputEl.files]
        }}
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
        >
          ${this.#uiState?.buttonText ?? 'Choose File'}
        </button>
        <div
          class="form-control ${validationState}"
          type="text"
          tabindex="0"
        >
          <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; display: flex; align-items: center">
            <span style="display: block;white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;">
              ${this.#buildText(this.#valueState?.value ?? [])}
            </span>
          </div>
        </div>
      </div>
    `
  }

  #buildText(value: File[]): string {
    if (value.length === 0) {
      return this.#uiState?.placeholder ?? 'No file chosen'
    }
    return value.map((f) => f.name).join(', ')
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe(async (state) => {
      this.#valueState = state
      this.requestUpdate()
      await this.updateComplete
      // this.textInputEl.value =
      //   this.#valueState.value.map((f) => f.name).join(', ') ?? ''
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
