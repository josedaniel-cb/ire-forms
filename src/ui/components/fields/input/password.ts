import { html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { AbstractInputController } from '../../../../controllers/fields/abstract-input'
import { FieldElement } from '../../field'

@customElement('ire-password-input')
class PasswordElement extends FieldElement {
  static override styles = FieldElement.styles
  declare controller: AbstractInputController

  @state()
  protected _obscure = true

  fieldTemplate() {
    return html`
      <div
        class=${classMap({
          'form-password': true,
          obscure: this._obscure,
        })}
      >
        <input
          id="element"
          class=${classMap({
            'form-control': true,
            'is-invalid': this._isInvalid,
          })}
          type="${this._obscure ? 'password' : 'text'}"
        />
        <div
          class="icon"
          @click="${this._switch}"
        ></div>
      </div>
    `
  }

  protected _switch() {
    this._obscure = !this._obscure
  }
}
