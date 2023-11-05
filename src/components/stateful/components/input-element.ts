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

enum InputValidationClass {
  IsValid = 'is-valid',
  IsInvalid = 'is-invalid',
  None = '',
}

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
  touched!: boolean

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
    let validationClass = InputValidationClass.None
    if (this.touched && this.isInvalid) {
      validationClass = InputValidationClass.IsInvalid
    } else if (!this.isInvalid) {
      validationClass = InputValidationClass.IsValid
    }
    return html`
      <div
        class="iconized-control"
      >
        <input
          .type=${this.type ?? 'text'}
          class="form-control iconized-control__input ${validationClass}"
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
            : validationClass === InputValidationClass.IsInvalid
            ? html`
              <ire-last-icon-wrapper
                class="iconized-control__icon"
                .params=${Icon.bootstrap('exclamation-circle')}
              ></ire-last-icon-wrapper>
            `
            : validationClass === InputValidationClass.IsValid
            ? html`
              <ire-last-icon-wrapper
                class="iconized-control__icon"
                .params=${Icon.bootstrap('check-circle')}
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
