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
// import { mosaicCss } from '../css/mosaic-css'
import { bootstrapCss2 } from './bootstrap2'
import './checkboxes-element'
import './chips-element'
import './native-select-element'
import './radios-element'
import './text-element'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { HTMLTemplateResult, LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

@customElement('ire-form')
export class IreFormElement extends LitElement {
  // static override styles = [mosaicCss, layoutsCss, baseCss]
  // static override styles = [
  //   layoutsCss,
  //   css`
  //     * {
  //       transition-property: background-color, border-color;
  //       transition-duration: 150ms;
  //       transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  //     }

  //     fieldset {
  //       border: 1px solid rgb(206, 212, 218);
  //       border-radius: 0.25rem;
  //       padding: 0.75rem;
  //     }

  //     fieldset.no-border {
  //       border-width: 0;
  //       padding: 0;
  //     }

  //     /* legend {
  //       color: rgb(148, 163, 184);
  //       font-size: 0.75rem;
  //     } */
  //   `,
  // ]
  static get styles() {
    return [layoutsCss, bootstrapCss2]
  }

  @property()
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller?: FormController<any>

  override render() {
    // const fontFamilyName = 'Open Sans'
    // const fontFamilyName = 'Montserrat'
    // const fontUrl = buildFontURL({
    //   families: [{ familyName: fontFamilyName }],
    // })
    // <!-- <style>
    //   @import url('${unsafeHTML(fontUrl)}');

    //   * {
    //     font-family: '${fontFamilyName}' !important;
    //   }
    // </style> -->
    return html`
      <!-- <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">@</span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <span class="input-group-text" id="basic-addon2">@example.com</span>
      </div>

      <div class="mb-3">
        <label for="basic-url" class="form-label">Your vanity URL</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
          <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4">
        </div>
        <div class="form-text" id="basic-addon4">Example help text goes outside the input group.</div>
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">$</span>
        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
        <span class="input-group-text">.00</span>
      </div>

      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Username" aria-label="Username">
        <span class="input-group-text">@</span>
        <input type="text" class="form-control" placeholder="Server" aria-label="Server">
      </div>

      <div class="input-group">
        <span class="input-group-text">With textarea</span>
        <textarea class="form-control" aria-label="With textarea"></textarea>
      </div> -->

      <form>
        ${
          this.controller !== undefined
            ? this._renderFieldSet(this.controller)
            : html`<span class="text-danger">Controller is missing</span>`
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
        <ire-text .controller=${fieldController}></ire-text>
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
