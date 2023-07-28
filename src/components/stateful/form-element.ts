import { FieldController } from '../../fields/field-controller'
import { TextFieldController } from '../../fields/text-field/controller'
import { FormUILayouts } from '../../form-ui/form-ui-layout'
import { FormBuilder } from '../../form/form-builder'
import {
  FormController,
  FormControllerChildren,
} from '../../form/form-controller'
import { baseCss } from '../css/base-css'
import { layoutsCss } from '../css/layout-css'
import { renderStyleSheetLinks } from '../stateless/external-style-sheets'
import { CSSResult, HTMLTemplateResult, LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

// import { FieldSet } from '../../core/field-set'

// import { AbstractFieldController } from '../../controllers/abstract-field'
// import { CheckboxInputController } from '../../controllers/fields/input/checkbox'
// import { DateInputController } from '../../controllers/fields/input/date'
// import { NumberInputController } from '../../controllers/fields/input/number'
// import { TextInputController } from '../../controllers/fields/input/text/text'
// import { FormController } from '../../controllers/form'
// import { FileInputController } from '../../controllers/fields/input/file'
// import { RadiosController } from '../../controllers/fields/select/radios'
// import { SelectController } from '../../controllers/fields/select'
// import { TextAreaController } from '../../controllers/fields/textarea'
// import { TimeInputController } from '../../controllers/fields/input/time'
// import { PasswordInputController } from '../../controllers/fields/input/text/password'
// import { CustomSelectController } from '../../controllers/fields/select/custom-select'

// import { Layouts } from '../styles/layouts'
// import { layoutsCss } from '../styles/css/layouts-css'
// import { FormConfig } from '../../core/config'

import { mosaicCss } from '../css/mosaic-css'
import './input-element'
// import './fields/input/password'
// import './fields/input/checkbox'
// import './fields/input/file'
// import './fields/select'
// import './fields/select/radios'
// import './fields/select/custom-select'
// import './fields/textarea'
// import './fields/multiple-select'
// import { renderExternalStyleSheets } from './util'
// import { baseCss } from '../styles/css/base-css'
// import { MultipleSelectController } from '../../controllers/fields/multiple-select'

@customElement('ire-form')
export class IreFormElement extends LitElement {
  static override styles = [mosaicCss, layoutsCss, baseCss]

  @property()
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  controller?: FormController<any>

  // connectedCallback() {
  //   super.connectedCallback()
  //   FormComponent.styles = [mosaicCss, layoutsCss, baseCss]
  // }

  override render() {
    return html`
      ${renderStyleSheetLinks(FormBuilder.config.stylesheets)}
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
    fieldController: FieldController<any, any, any>,
  ): HTMLTemplateResult | undefined {
    let template: HTMLTemplateResult | undefined = undefined

    // if (
    //   controller instanceof DateInputController ||
    //   controller instanceof TimeInputController ||
    //   controller instanceof TextInputController ||
    //   controller instanceof NumberInputController
    // )
    //   template = html`<ire-input .controller=${controller}></ire-input>`

    // if (controller instanceof PasswordInputController)
    //   template = html`
    //     <ire-password-input .controller=${controller}></ire-password-input>
    //   `

    // if (controller instanceof CheckboxInputController)
    //   template = html`
    //     <ire-checkbox-input .controller=${controller}></ire-checkbox-input>
    //   `

    // if (controller instanceof FileInputController)
    //   template = html`
    //     <ire-file-input .controller=${controller}></ire-file-input>
    //   `

    // if (controller instanceof SelectController)
    //   template = html` <ire-select .controller=${controller}></ire-select> `

    // if (controller instanceof RadiosController)
    //   template = html` <ire-radios .controller=${controller}></ire-radios> `

    // if (controller instanceof CustomSelectController)
    //   template = html`
    //     <ire-custom-select .controller=${controller}></ire-custom-select>
    //   `

    // if (controller instanceof MultipleSelectController)
    //   template = html`
    //     <ire-multiple-select .controller=${controller}></ire-multiple-select>
    //   `

    // if (controller instanceof TextAreaController)
    //   template = html` <ire-textarea .controller=${controller}></ire-textarea> `

    if (fieldController instanceof TextFieldController) {
      template = html` <ire-input .controller=${fieldController}></ire-input> `
    }

    if (template === undefined) {
      return undefined
    }

    // class="${ifDefined(fieldController.wrapperClasses)}"
    // style="${ifDefined(fieldController.wrapperStyles)}"
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
