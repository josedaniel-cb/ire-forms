import 'last-icon'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { Icon } from '../../icons/icon'

@customElement('ire-last-icon-wrapper')
export class LastIconWrapperElement extends LitElement {
  static override styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Recommended styles: https://www.npmjs.com/package/last-icon */

      l-i {
        --size: 1.25em;
        display: inline-flex;
        width: var(--size);
        height: var(--size);
        vertical-align: middle;
      }

      l-i svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      p l-i,
      button l-i,
      a l-i,
      span l-i {
        vertical-align: -0.125em;
      }
    `,
  ]

  @property()
  params!: Icon

  override render(): HTMLTemplateResult {
    return html`
      <l-i
        set="${this.params.set}"
        name="${this.params.name}"
        type="${ifDefined(this.params.type)}"
      ></l-i>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-last-icon-wrapper': LastIconWrapperElement
  }
}
