var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { AbstractFieldController } from '../../controllers/abstract-field';
import { CheckboxInputController } from '../../controllers/fields/input/checkbox';
import { DateInputController } from '../../controllers/fields/input/date';
import { NumberInputController } from '../../controllers/fields/input/number';
import { TextInputController } from '../../controllers/fields/input/text/text';
import { FileInputController } from '../../controllers/fields/input/file';
import { RadiosController } from '../../controllers/fields/select/radios';
import { SelectController } from '../../controllers/fields/select';
import { TextAreaController } from '../../controllers/fields/textarea';
import { TimeInputController } from '../../controllers/fields/input/time';
import { PasswordInputController } from '../../controllers/fields/input/text/password';
import { CustomSelectController } from '../../controllers/fields/select/custom-select';
import { Layouts } from '../styles/layouts';
import { layoutsCss } from '../styles/css/layouts-css';
import { FormConfig } from '../../core/config';
import './fields/input';
import './fields/input/password';
import './fields/input/checkbox';
import './fields/input/file';
import './fields/select';
import './fields/select/radios';
import './fields/select/custom-select';
import './fields/textarea';
import './fields/multiple-select';
import { renderExternalStyleSheets } from './util';
import { baseCss } from '../styles/css/base-css';
import { MultipleSelectController } from '../../controllers/fields/multiple-select';
let FormElement = class FormElement extends LitElement {
    static styles = [FormConfig.theme, layoutsCss, baseCss];
    controller;
    render() {
        return html `
      ${renderExternalStyleSheets()}
      <form>
        ${this.controller !== undefined
            ? this._renderFieldSet(this.controller.tree)
            : 'Controller is missing'}
      </form>
    `;
    }
    _renderFieldSet(fieldset) {
        const layout = fieldset.layout ?? Layouts.singleColumn;
        const classes = fieldset.classes !== undefined ? fieldset.classes : '';
        const styles = fieldset.styles !== undefined ? fieldset.styles : '';
        return html `
      <fieldset
        class=${classMap({
            [layout.classes]: layout.classes !== '',
            [classes]: classes !== '',
            'no-border': fieldset.legend === undefined,
        })}
        style="${ifDefined(layout.styles !== '' || styles !== ''
            ? `${layout.styles}; ${styles}`
            : undefined)}"
      >
        ${fieldset.legend !== undefined
            ? html `<legend>${fieldset.legend}</legend>`
            : ''}
        ${fieldset.fields.map((child) => {
            if (child instanceof AbstractFieldController) {
                return this._renderField(child);
            }
            else {
                return html `
              <div class="form-child">${this._renderFieldSet(child)}</div>
            `;
            }
        })}
      </fieldset>
    `;
    }
    _renderField(controller) {
        let template;
        if (controller instanceof DateInputController ||
            controller instanceof TimeInputController ||
            controller instanceof TextInputController ||
            controller instanceof NumberInputController)
            template = html `<ire-input .controller=${controller}></ire-input>`;
        if (controller instanceof PasswordInputController)
            template = html `
        <ire-password-input .controller=${controller}></ire-password-input>
      `;
        if (controller instanceof CheckboxInputController)
            template = html `
        <ire-checkbox-input .controller=${controller}></ire-checkbox-input>
      `;
        if (controller instanceof FileInputController)
            template = html `
        <ire-file-input .controller=${controller}></ire-file-input>
      `;
        if (controller instanceof SelectController)
            template = html ` <ire-select .controller=${controller}></ire-select> `;
        if (controller instanceof RadiosController)
            template = html ` <ire-radios .controller=${controller}></ire-radios> `;
        if (controller instanceof CustomSelectController)
            template = html `
        <ire-custom-select .controller=${controller}></ire-custom-select>
      `;
        if (controller instanceof MultipleSelectController)
            template = html `
        <ire-multiple-select .controller=${controller}></ire-multiple-select>
      `;
        if (controller instanceof TextAreaController)
            template = html ` <ire-textarea .controller=${controller}></ire-textarea> `;
        return html `
      <div
        class="form-child"
        class="${ifDefined(controller.wrapperClasses)}"
        style="${ifDefined(controller.wrapperStyles)}"
      >
        ${template}
      </div>
    `;
    }
};
__decorate([
    property({ attribute: false })
], FormElement.prototype, "controller", void 0);
FormElement = __decorate([
    customElement('ire-form')
], FormElement);
export { FormElement };
//# sourceMappingURL=form.js.map