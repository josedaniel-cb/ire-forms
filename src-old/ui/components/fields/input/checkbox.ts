import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FieldElement } from '../../field'
import { renderExternalStyleSheets } from '../../util'

@customElement('ire-checkbox-input')
class CheckboxInputElement extends FieldElement {
  // static override styles = FieldElement.styles
  static override get styles() {
    return FieldElement.styles
  }

  override render() {
    return html`
      ${renderExternalStyleSheets()}
      <div class="form-check">
        ${this.fieldTemplate()} ${this.headerTemplate()}
      </div>
      ${this.messageTemplate()}
    `
  }

  override headerTemplate() {
    if (this.controller.label === undefined) {
      return html``
    }

    return html`
      <label
        for="element"
        class="form-check-label"
      >
        ${this.controller.label}
      </label>
    `
  }

  fieldTemplate() {
    return html`
      <input
        id="element"
        class="form-check-input"
        type="checkbox"
      />
    `
  }
}
