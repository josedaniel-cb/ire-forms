import {
  FileFieldController,
  FileFieldUIState,
  FileFieldValueState,
} from '../../fields/controllers/file-controller'
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
import { customElement, property, state } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'

@customElement('ire-file')
export class IreFileElement extends FieldElement {
  static override styles = [bootstrapCss2]

  @query('input')
  el!: HTMLInputElement

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
      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <span class="input-group-text">0.00</span>
        <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
        <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
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
