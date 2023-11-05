import { FieldController } from '../../../fields/controllers/base/field-controller'
// import { FormBuilder } from '../../../form/builder/form-builder'
import { baseCss } from '../../css/base-css'
import { layoutsCss } from '../../css/layout-css'
import { mosaicCss } from '../../css/mosaic-css'
import { bootstrapCss2 } from '../bootstrap2'
// import { renderStyleSheetLinks } from '../../stateless/external-style-sheets'
import { HTMLTemplateResult, LitElement, html } from 'lit'

export abstract class FieldElement extends LitElement {
  // static override styles = [baseCss, layoutsCss, mosaicCss]
  static override styles = [layoutsCss, bootstrapCss2]

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller!: FieldController<any, any, any, any>

  override render() {
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
        class="form-label"
        for="element"
      >
        ${label}
      </label>
    `
  }

  protected abstract _renderField(): HTMLTemplateResult

  protected _renderValidationMessage(errorMessage: string) {
    // class="invalid-input-message"
    return html`
      <div
        class="invalid-feedback"
      >
        ${errorMessage}
      </div>
    `
  }

  override disconnectedCallback(): void {
    this.controller.disconnect()
  }
}
