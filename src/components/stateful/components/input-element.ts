import { formControlsCss } from '../../css/form-controls-css'
import { formFieldCss } from '../../css/form-field-css'
import { iconizedControlCss } from '../../css/iconized-control-css'
import { layoutsCss } from '../../css/layout-css'
import { Icon } from '../../icons/icon'
import { bootstrapCss2 } from '../bootstrap2'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class IreInputElement extends LitElement {
  static override styles = [
    layoutsCss,
    // formFieldCss,
    // formControlsCss,
    bootstrapCss2,
    iconizedControlCss,
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
      <!-- <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div> -->
      <div
        class="iconized-control"
      >
        <input
          .type=${this.type ?? 'text'}
          class="form-control iconized-control__input ${classMap({
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
              class="iconized-control__icon ${classMap({
                clickable: this.leadingIcon.onClick !== undefined,
              })}"
              .params=${this.leadingIcon.icon}
              @click=${this.leadingIcon?.onClick}
            ></ire-last-icon-wrapper>
          `
            : this.isInvalid
            ? html`
              <ire-last-icon-wrapper
                class="iconized-control__icon"
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
