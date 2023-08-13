import { FieldController } from '../../fields/controllers/base/field-controller'
import { CheckboxesFieldController } from '../../fields/controllers/checkboxes-controller'
import { ChipsFieldController } from '../../fields/controllers/chips-controller'
import { NativeSelectFieldController } from '../../fields/controllers/native-select-controller'
import { RadiosFieldController } from '../../fields/controllers/radios-controller'
import { TextFieldController } from '../../fields/controllers/text-controller'
import { FormUILayouts } from '../../form-ui/form-ui-layout'
import { FormController } from '../../form/controller/form-controller'
import { baseCss } from '../css/base-css'
import { buildFontURL } from '../css/build-font-url'
import { layoutsCss } from '../css/layout-css'
import { mosaicCss } from '../css/mosaic-css'
import './checkboxes-element'
import './chips-element'
import './input-element'
import './native-select-element'
import './radios-element'
import { HTMLTemplateResult, LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-form')
export class IreFormElement extends LitElement {
  static override styles = [mosaicCss, layoutsCss, baseCss]

  @property()
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller?: FormController<any>

  override render() {
    // ${renderStyleSheetLinks(FormBuilder.uiConfig.stylesheets)}
    const fontUrl = buildFontURL({
      families: [
        {
          familyName: 'Open Sans',
          wght: [400, 500, 700],
        },
      ],
    })
    return html`
      <style>
        @import url('${fontUrl}');

        * {
          font-family: 'Open Sans', sans-serif;
        }
      </style>
      <form>
        ${
          this.controller !== undefined
            ? this._renderFieldSet(this.controller)
            : 'Controller is missing'
        }
      </form>
    `
  }

  protected _renderFieldSet(
    // rome-ignore lint/suspicious/noExplicitAny: any is required here
    formNode: FormController<any>,
  ): HTMLTemplateResult {
    const layout = formNode.uiConfig?.layout ?? FormUILayouts.singleColumn
    const classes = formNode.uiConfig?.class ?? ''
    const styles = formNode.uiConfig?.style ?? ''

    return html`
      <fieldset
        class=${classMap({
          [layout.classes]: layout.classes !== '',
          [classes]: classes !== '',
        })}
        style="${ifDefined(
          layout.styles !== '' || styles !== ''
            ? `${layout.styles}; ${styles}`
            : undefined,
        )}"
      >
        ${Object.values(formNode.children).map((child) => {
          if (child instanceof FormController) {
            return html`
              <div class="form-child">
                ${this._renderFieldSet(child)}
              </div>
            `
          }
          return this._renderField(child)
        })}
      </fieldset>
    `
  }

  protected _renderField(
    // rome-ignore lint/suspicious/noExplicitAny: any is required here
    fieldController: FieldController<any, any, any, any>,
  ): HTMLTemplateResult | undefined {
    let template: HTMLTemplateResult | undefined = undefined

    if (fieldController instanceof NativeSelectFieldController) {
      template = html`
        <ire-native-select .controller=${fieldController}></ire-native-select>
      `
    } else if (fieldController instanceof ChipsFieldController) {
      template = html`
        <ire-chips .controller=${fieldController}></ire-chips>
      `
    } else if (fieldController instanceof CheckboxesFieldController) {
      template = html`
        <ire-checkboxes .controller=${fieldController}></ire-checkboxes>
      `
    } else if (fieldController instanceof RadiosFieldController) {
      template = html`
        <ire-radios .controller=${fieldController}></ire-radios>
      `
    } else if (fieldController instanceof TextFieldController) {
      template = html`
        <ire-input .controller=${fieldController}></ire-input>
      `
    }

    if (template === undefined) {
      return undefined
    }

    return html`
      <div
        class="form-child"
      >
        ${template}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-form': IreFormElement
  }
}
