import {
  TextFieldController,
  TextFieldUIState,
  TextFieldValueState,
} from '../../../fields/controllers/text-controller'
import { formControlsCss } from '../../css/form-controls-css'
import { formFieldCss } from '../../css/form-field-css'
import { layoutsCss } from '../../css/layout-css'
import { Icon } from '../../icons/icon'
import { FieldElement } from '../base/field-element'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query, state } from 'lit/decorators.js'
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
        /* width: 100%; */
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

  protected render(): HTMLTemplateResult {
    return html`
      <div class="wrapper">
        <input
          type="text"
          class="form-input ${classMap({
            'is-invalid': this.isInvalid,
          })}"
          placeholder="${ifDefined(this.placeholder)}"
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
          this.isInvalid
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
