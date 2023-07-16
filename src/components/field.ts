import { LitElement, html, HTMLTemplateResult, CSSResult } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { FormBuilder } from '../form/form-builder'
import { layoutsCss } from '../form-ui/base-css/layout-css'
import { baseCss } from '../form-ui/base-css/base-css'
import { FieldController } from '../fields/field-controller'
import { renderStyleSheetLinks } from './stateless/external-style-sheets'

export abstract class FieldElement extends LitElement {
  static override styles: CSSResult[] = []

  // @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller!: FieldController<any, any, any>

  constructor() {
    super()
    FieldElement.styles = [FormBuilder.uiConfig.theme.css, layoutsCss, baseCss]
  }

  override render() {
    return html`
      ${renderStyleSheetLinks(FormBuilder.config.stylesheets)}
      ${this._renderLabel()}
      ${this._renderField()}
      ${this._renderValidationMessage()}
    `
  }

  protected _renderLabel() {
    const label = html`
      <span>
        ${this.controller.uiState.label}
        ${
          this.controller.required
            ? html`<span class="text-danger">*</span>`
            : undefined
        }
      </span>
    `

    return html`
      <label
        class="form-label flex"
        for="element"
      >
        ${label}
      </label>
    `
  }

  protected abstract _renderField(): HTMLTemplateResult

  protected _renderValidationMessage() {
    const errorMessage =
      this.controller.valueState.validationResult.errorMessage
    return html`
      <div
        class="invalid-input-message"
        style=${styleMap({
          display: errorMessage === null ? null : 'none',
        })}
      >
        ${errorMessage}
      </div>
    `
  }

  // override connectedCallback(): void {
  //   super.connectedCallback()
  //   FieldElement.styles = [FormBuilder.uiConfig.theme.css, layoutsCss, baseCss]
  // }

  override disconnectedCallback(): void {
    this.controller.disconnect()
  }
}
