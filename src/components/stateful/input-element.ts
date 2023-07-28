import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/text-field/controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class IreInputElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('input')
  el!: HTMLInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  // @state()
  // private _valueState?: TextFieldValueState
  #valueState?: TextFieldValueState

  // @state()
  // private _uiState?: TextFieldUIState
  #uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    // type="${this.controller.type}"
    // placeholder="${ifDefined(this._uiState.placeholder)}"
    // value="${this._valueState.value}"
    // console.log(
    //   '🚀 ~ file: input.ts:35 ~ InputElement ~ _renderField ~ this._valueState?.validationResult.isValid:',
    //   this._valueState?.validationResult.isValid,
    // )
    // console.log(
    //   '🚀 ~ file: input.ts:37 ~ InputElement ~ _renderField ~ this._uiState?.touched:',
    //   this._uiState?.touched,
    // )
    const isInvalid = Boolean(
      !this.#valueState?.validationResult.isValid && this.#uiState?.touched,
    )
    console.log(
      '🚀 ~ file: input.ts:36 ~ InputElement ~ _renderField ~ isInvalid:',
      isInvalid,
    )
    return html`
      <input
        class=${classMap({
          'form-control': true,
          'is-invalid': isInvalid,
        })}
        placeholder="${ifDefined(this.#uiState?.placeholder ?? undefined)}"
        type="text"
        @input="${this.#handleInput}"
        @blur="${this.#handleBlur}"
      />
    `
  }

  override firstUpdated(): void {
    this.controller.connect(this)
    this.controller.valueStateChanges.subscribe((state) => {
      this.#valueState = state
      this.requestUpdate()

      this.el.value = state.value
    })
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }

  #handleInput(_: Event): void {
    this.controller.value = this.el.value
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}
