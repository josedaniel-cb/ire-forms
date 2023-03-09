var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { layoutsCss } from '../styles/css/layouts-css';
import { FormConfig } from '../../core/config';
import { baseCss } from '../styles/css/base-css';
let ButtonElement = class ButtonElement extends LitElement {
    static styles = [FormConfig.theme, layoutsCss, baseCss];
    label;
    disabled;
    loading;
    fieldTemplate() {
        return html `
      <button
        class="btn btn-primary"
        @click=${this._onClick}
      >
        ${this.label}
      </button>
    `;
    }
    _onClick() {
        this.dispatchEvent(new CustomEvent('clickEvent'));
    }
};
__decorate([
    property()
], ButtonElement.prototype, "label", void 0);
__decorate([
    property({ type: Boolean })
], ButtonElement.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], ButtonElement.prototype, "loading", void 0);
ButtonElement = __decorate([
    customElement('ire-button')
], ButtonElement);
//# sourceMappingURL=button.js.map