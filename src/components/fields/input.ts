import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { FieldElement } from '../field'
import { query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../fields/text-field/controller'

@customElement('ire-input')
export class InputElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('input')
  el!: HTMLInputElement

  @property({ attribute: false })
  override controller!: TextFieldController

  @state()
  protected _valueState!: TextFieldValueState

  @state()
  protected _uiState!: TextFieldUIState

  protected _renderField(): HTMLTemplateResult {
    // type="${this.controller.type}"
    return html`
      <input
        value="${this._valueState.value}"
        class=${classMap({
          'form-control': true,
          'is-invalid': !this._valueState.validationResult.isValid,
        })}
        placeholder="${ifDefined(this._uiState.placeholder)}"
        type="text"
      />
    `
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this.controller.connect(this.el)
    this.controller.valueStateChanges.subscribe((state) => {
      this._valueState = state
      this.el.value = state.value
    })
    this.controller.uiStateChanges.subscribe((state) => {
      this._uiState = state
    })
    this.el.addEventListener('input', this.#handleInput)
    this.el.addEventListener('blur', this.#handleBlur)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this.el.removeEventListener('input', this.#handleInput)
    this.el.removeEventListener('blur', this.#handleBlur)
  }

  #handleInput(): void {
    this.controller.value = this.el.value
  }

  #handleBlur(): void {
    this.controller.markAsTouched()
  }
}
