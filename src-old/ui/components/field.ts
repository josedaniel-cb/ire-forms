import { LitElement, html, HTMLTemplateResult } from 'lit'
import { property, query } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { AbstractFieldController } from '../../controllers/abstract-field'
import { layoutsCss } from '../styles/css/layouts-css'
import { FormConfig } from '../../core/config'
import { renderButtons, renderExternalStyleSheets } from './util'
import { baseCss } from '../styles/css/base-css'

export abstract class FieldElement extends LitElement {
  static override styles = [FormConfig.theme, layoutsCss, baseCss]

  @property({ attribute: false })
  controller!: AbstractFieldController

  @query('#element')
  element!: HTMLElement

  protected _isInvalid = true

  override render() {
    return html`
      ${renderExternalStyleSheets()} ${this.headerTemplate()}
      ${this.fieldTemplate()} ${this.messageTemplate()}
    `
  }

  headerTemplate() {
    let label: HTMLTemplateResult | undefined
    if (this.controller.label !== undefined) {
      label = html`
        <span>
          ${this.controller.label}
          ${
            this.controller.required
              ? html`<span class="text-danger">*</span>`
              : undefined
          }
        </span>
      `
    }

    let buttons: HTMLTemplateResult | undefined
    const labelActions = this.controller.buttons?.labelActions
    if (labelActions !== undefined) {
      buttons = renderButtons(labelActions)
    }

    if (label === undefined && buttons === undefined) {
      return undefined
    }

    return html`
      <label
        class="form-label flex"
        for="element"
      >
        ${label} ${buttons}
      </label>
    `
  }

  abstract fieldTemplate(): HTMLTemplateResult

  messageTemplate() {
    return html`
      <div
        class="invalid-input-message"
        style=${styleMap({
          display: this._isInvalid ? null : 'none',
        })}
      >
        ${this.controller.invalidStateMessages[0]}
      </div>
    `
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this.controller.stateChanges.subscribe((state) => {
      this._isInvalid = !state.isValid && state.touched
      this.requestUpdate()
    })
  }

  override firstUpdated(): void {
    this.controller.connect(this.element)
  }

  override disconnectedCallback(): void {
    this.controller.disconnect()
  }
}
