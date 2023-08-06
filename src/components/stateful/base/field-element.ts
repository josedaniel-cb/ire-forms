import { FieldController } from '../../../fields/controllers/field-controller'
// import { FormBuilder } from '../../../form/builder/form-builder'
import { baseCss } from '../../css/base-css'
import { layoutsCss } from '../../css/layout-css'
import { mosaicCss } from '../../css/mosaic-css'
// import { renderStyleSheetLinks } from '../../stateless/external-style-sheets'
import { HTMLTemplateResult, LitElement, html } from 'lit'

export abstract class FieldElement extends LitElement {
  static override styles = [mosaicCss, layoutsCss, baseCss]

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller!: FieldController<any, any, any, any>

  override render() {
    // ${renderStyleSheetLinks(FormBuilder.uiConfig.stylesheets)}
    return html`
      ${this._renderLabel()}
      ${this._renderField()}
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

  protected _renderValidationMessage(errorMessage: string) {
    return html`
      <div
        class="invalid-input-message"
      >
        ${errorMessage}
      </div>
    `
  }

  override disconnectedCallback(): void {
    this.controller.disconnect()
  }
}
