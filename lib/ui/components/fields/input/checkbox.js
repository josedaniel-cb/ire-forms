var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { FieldElement } from '../../field';
import { renderExternalStyleSheets } from '../../util';
let CheckboxInputElement = class CheckboxInputElement extends FieldElement {
    // static override styles = FieldElement.styles
    static get styles() {
        return FieldElement.styles;
    }
    render() {
        return html `
      ${renderExternalStyleSheets()}
      <div class="form-check">
        ${this.fieldTemplate()} ${this.headerTemplate()}
      </div>
      ${this.messageTemplate()}
    `;
    }
    headerTemplate() {
        if (this.controller.label === undefined) {
            return html ``;
        }
        return html `
      <label
        for="element"
        class="form-check-label"
      >
        ${this.controller.label}
      </label>
    `;
    }
    fieldTemplate() {
        return html `
      <input
        id="element"
        class="form-check-input"
        type="checkbox"
      />
    `;
    }
};
CheckboxInputElement = __decorate([
    customElement('ire-checkbox-input')
], CheckboxInputElement);
//# sourceMappingURL=checkbox.js.map