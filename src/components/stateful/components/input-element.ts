import { formControlsCss } from '../../css/form-controls-css'
import { formFieldCss } from '../../css/form-field-css'
import { layoutsCss } from '../../css/layout-css'
import { Icon } from '../../icons/icon'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class IreInputElement extends LitElement {
  static override styles = [
    layoutsCss,
    formFieldCss,
    formControlsCss,
    css`
      .wrapper {
        position: relative;
        display: grid;
      }

      .wrapper:has(ire-last-icon-wrapper) input {
        padding-right: 2.5rem/* 40px */;
      }

      .wrapper ire-last-icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 2.5rem;
        margin: auto;
        pointer-events: none;
        color: rgb(148, 163, 184);
      }

      .is-invalid + ire-last-icon-wrapper {
        color: red;
      }

      ire-last-icon-wrapper.clickable {
        pointer-events: auto;
        cursor: pointer;
      }
    `,
  ]

  @query('input')
  inputEl!: HTMLInputElement

  @property()
  placeholder?: string

  @property()
  isInvalid!: boolean

  @property()
  enabled!: boolean

  @property()
  type?: string

  @property()
  max?: string

  @property()
  maxLength?: number

  @property()
  min?: string

  @property()
  minLength?: number

  @property()
  leadingIcon?: {
    icon: Icon
    onClick?: () => void
  }

  @property()
  step?: string

  protected render(): HTMLTemplateResult {
    return html`
      <div class="wrapper">
        <input
          .type=${this.type ?? 'text'}
          class="form-input ${classMap({
            'is-invalid': this.isInvalid,
          })}"
          placeholder="${ifDefined(this.placeholder)}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          minlength="${ifDefined(this.minLength)}"
          maxlength="${ifDefined(this.maxLength)}"
          ?disabled="${!(this.enabled ?? true)}"
          @input=${() => {
            this.dispatchEvent(
              new CustomEvent('inputchange', {
                detail: {
                  value: this.inputEl.value,
                },
                bubbles: true,
                composed: true,
              }),
            )
          }}
          @blur=${() => {
            this.dispatchEvent(new CustomEvent('inputblur'))
          }}
        />
        ${
          this.leadingIcon
            ? html`
            <ire-last-icon-wrapper
              class="${classMap({
                clickable: this.leadingIcon.onClick !== undefined,
              })}"
              .params=${this.leadingIcon.icon}
              @click=${this.leadingIcon?.onClick}
            ></ire-last-icon-wrapper>
          `
            : this.isInvalid
            ? html`
              <ire-last-icon-wrapper
                .params=${Icon.bootstrap('exclamation-triangle-fill')}
              ></ire-last-icon-wrapper>
            `
            : undefined
        }
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-input': IreInputElement
  }
}
