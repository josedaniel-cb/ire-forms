import { RadiosController } from '../../../../controllers/fields/select/radios'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { AbstractSelectElement } from '../select'

@customElement('ire-radios')
class RadiosElement extends AbstractSelectElement {
  static override styles = AbstractSelectElement.styles

  declare controller: RadiosController

  fieldTemplate() {
    return html`
      <div id="element">
        ${this.controller.options.map(
          (option, index) => html`
            <div class="form-check">
              <input
                id="${index}"
                class="form-check-input"
                type="radio"
                name="_"
                value="${index}"
              />
              <label
                class="form-check-label"
                for="${index}"
              >
                ${option.label}
              </label>
            </div>
          `,
        )}
      </div>
    `
  }
}
