import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { layoutsCss } from '../styles/css/layouts-css'
import { FormConfig } from '../../core/config'
import { baseCss } from '../styles/css/base-css'

@customElement('ire-button')
class ButtonElement extends LitElement {
  static override styles = [FormConfig.theme, layoutsCss, baseCss]

  @property()
  label!: string

  @property({ type: Boolean })
  disabled!: boolean

  @property({ type: Boolean })
  loading!: boolean

  fieldTemplate() {
    return html`
      <button
        class="btn btn-primary"
        @click=${this._onClick}
      >
        ${this.label}
      </button>
    `
  }

  private _onClick() {
    this.dispatchEvent(new CustomEvent('clickEvent'))
  }
}
