var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { layoutsCss } from '../styles/css/layouts-css';
import { FormConfig } from '../../core/config';
import { renderButtons, renderExternalStyleSheets } from './util';
import { baseCss } from '../styles/css/base-css';
export class FieldElement extends LitElement {
    constructor() {
        super(...arguments);
        this._isInvalid = true;
    }
    static { this.styles = [FormConfig.theme, layoutsCss, baseCss]; }
    render() {
        return html `
      ${renderExternalStyleSheets()} ${this.headerTemplate()}
      ${this.fieldTemplate()} ${this.messageTemplate()}
    `;
    }
    headerTemplate() {
        let label;
        if (this.controller.label !== undefined) {
            label = html `
        <span>
          ${this.controller.label}
          ${this.controller.required
                ? html `<span class="text-danger">*</span>`
                : undefined}
        </span>
      `;
        }
        let buttons;
        const labelActions = this.controller.buttons?.labelActions;
        if (labelActions !== undefined) {
            buttons = renderButtons(labelActions);
        }
        if (label === undefined && buttons === undefined) {
            return undefined;
        }
        return html `
      <label
        class="form-label flex"
        for="element"
      >
        ${label} ${buttons}
      </label>
    `;
    }
    messageTemplate() {
        return html `
      <div
        class="invalid-input-message"
        style=${styleMap({
            display: this._isInvalid ? null : 'none',
        })}
      >
        ${this.controller.invalidStateMessages[0]}
      </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.controller.stateChanges.subscribe((state) => {
            this._isInvalid = !state.isValid && state.touched;
            this.requestUpdate();
        });
    }
    firstUpdated() {
        this.controller.connect(this.element);
    }
    disconnectedCallback() {
        this.controller.disconnect();
    }
}
__decorate([
    property({ attribute: false })
], FieldElement.prototype, "controller", void 0);
__decorate([
    query('#element')
], FieldElement.prototype, "element", void 0);
//# sourceMappingURL=field.js.map