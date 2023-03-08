import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { AbstractInputController } from '../../../controllers/fields/abstract-input'
import { FieldElement } from '../field'

@customElement('ire-input')
export class InputElement extends FieldElement {
  static override styles = FieldElement.styles

  declare controller: AbstractInputController

  fieldTemplate() {
    return html`
      <input
        id="element"
        class=${classMap({
          'form-control': true,
          'is-invalid': this._isInvalid,
        })}
        type="${this.controller.type}"
      />
    `
  }
}
