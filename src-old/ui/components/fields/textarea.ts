import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { FieldElement } from '../field'

@customElement('ire-textarea')
class TextAreaElement extends FieldElement {
  static override styles = FieldElement.styles

  fieldTemplate() {
    return html`
      <textarea
        id="element"
        class=${classMap({
          'form-control': true,
          'is-invalid': this._isInvalid,
        })}
      >
      </textarea>
    `
  }
}
