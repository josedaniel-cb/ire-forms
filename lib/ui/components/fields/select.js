var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FieldElement } from '../field';
export class AbstractSelectElement extends FieldElement {
    static { this.styles = FieldElement.styles; }
    connectedCallback() {
        super.connectedCallback();
        this.controller.optionsChanges.subscribe(() => this.requestUpdate());
    }
}
let SelectElement = class SelectElement extends AbstractSelectElement {
    static { this.styles = AbstractSelectElement.styles; }
    fieldTemplate() {
        return html `
      <select
        id="element"
        class=${classMap({
            'form-select': true,
            'is-invalid': this._isInvalid,
        })}
      >
        <option hidden>
          ${this.controller.placeholder !== undefined
            ? this.controller.placeholder
            : 'Seleccione una opción'}
        </option>
        ${this.controller.options.map((option, index) => html `
            <option value="${index}">${option.label}</option>
          `)}
      </select>
    `;
    }
};
SelectElement = __decorate([
    customElement('ire-select')
], SelectElement);
//# sourceMappingURL=select.js.map