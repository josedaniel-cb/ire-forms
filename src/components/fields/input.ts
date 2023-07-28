import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/text-field/controller'
import { FieldElement } from '../field'
import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class InputElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('input')
  el!: HTMLInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  @state()
  protected _valueState?: TextFieldValueState

  @state()
  protected _uiState?: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    // type="${this.controller.type}"
    // placeholder="${ifDefined(this._uiState.placeholder)}"
    // value="${this._valueState.value}"
    return html`
      <input
        class=${classMap({
          'form-control': true,
          'is-invalid': !(this._valueState?.validationResult.isValid ?? true),
        })}
        placeholder="${ifDefined(
          this._uiState?.placeholder ? this._uiState.placeholder : undefined,
        )}"
        type="text"
      />
    `
  }

  // override connectedCallback(): void {
  //   super.connectedCallback()
  override firstUpdated(): void {
    this.controller.connect(this.el)
    this.controller.valueStateChanges.subscribe((state) => {
      this._valueState = state
      this.el.value = state.value
    })
    this.controller.uiStateChanges.subscribe((state) => {
      this._uiState = state
    })
    this.el.addEventListener('input', this.#handleInput.bind(this))
    this.el.addEventListener('blur', this.#handleBlur.bind(this))
  }

  // override disconnectedCallback(): void {
  //   super.disconnectedCallback()
  //   this.el.removeEventListener('input', this.#handleInput)
  //   this.el.removeEventListener('blur', this.#handleBlur)
  // }

  #handleInput(): void {
    // console.log(this)
    // console.log(
    //   '🚀 ~ file: input.ts:70 ~ #handleInput ~ this.controller:',
    //   this.controller,
    // )
    // console.log('🚀 ~ file: input.ts:71 ~ #handleInput ~ this.el:', this.el)
    this.controller.value = this.el.value
    // this.controller.value = (event.target as HTMLInputElement).value
  }

  #handleBlur(): void {
    this.controller.markAsTouched()
  }
}
