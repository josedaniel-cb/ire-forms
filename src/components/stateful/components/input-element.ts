import { baseCss } from '../../css/base-css'
import { iconizedControlCss } from '../../css/iconized-control-css'
// import { layoutsCss } from '../../css/layout-css'
import { Icon } from '../../icons/icon'
import { ControlValidationUiStateClassName } from '../../validation/control-validation-ui-state'
import { bootstrapCss2 } from '../bootstrap2'
import { HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-input')
export class IreInputElement extends LitElement {
  static override styles = [
    // layoutsCss,
    bootstrapCss2,
    iconizedControlCss,
    baseCss, // required because of .hidden
  ]

  @query('input')
  inputEl!: HTMLInputElement

  @property()
  placeholder?: string

  @property()
  validationState!: ControlValidationUiStateClassName

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
  leadingIcons?: {
    icon: Icon
    onClick?: () => void
  }[]

  @property()
  selectedIconIndex?: number

  @property()
  step?: string

  protected render(): HTMLTemplateResult {
    return html`
      <div
        class="iconized-control"
      >
        <input
          .type=${this.type ?? 'text'}
          class="form-control iconized-control__input ${this.validationState}"
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
        ${this.#renderIcons()}
      </div>
    `
  }

  #renderIcons() {
    // Ensure that either both leadingIcons and selectedIconIndex are set or none of them
    if (
      (this.leadingIcons !== undefined &&
        this.selectedIconIndex === undefined) ||
      (this.leadingIcons === undefined && this.selectedIconIndex !== undefined)
    ) {
      throw new Error('leadingIcons and selectedIconIndex must be both set')
    }

    // Define the icons to show
    const icons = [
      ...(this.leadingIcons ?? []),
      { icon: Icon.bootstrap('exclamation-circle') },
      { icon: Icon.bootstrap('check-circle') },
    ]

    // Determine which icon to show
    let selectedIndex: number | null = null
    if (this.selectedIconIndex !== undefined) {
      selectedIndex = this.selectedIconIndex
    } else if (
      this.validationState === ControlValidationUiStateClassName.IsInvalid
    ) {
      selectedIndex = icons.length - 2
    } else if (
      this.validationState === ControlValidationUiStateClassName.IsValid
    ) {
      selectedIndex = icons.length - 1
    }

    // Render all icons, but show only the selected one
    const htmlIcons = icons.map((icon, i) => {
      return html`
        <ire-last-icon-wrapper
          class="iconized-control__icon ${classMap({
            clickable: icon.onClick !== undefined,
            hidden: selectedIndex !== i,
          })}"
          .params=${icon.icon}
          @click=${icon.onClick}
        ></ire-last-icon-wrapper>
      `
    })

    return htmlIcons
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-input': IreInputElement
  }
}
