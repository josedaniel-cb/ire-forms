var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { FieldElement } from '../../field';
let PasswordElement = class PasswordElement extends FieldElement {
    constructor() {
        super(...arguments);
        this._obscure = true;
    }
    static { this.styles = FieldElement.styles; }
    fieldTemplate() {
        return html `
      <div
        class=${classMap({
            'form-password': true,
            obscure: this._obscure,
        })}
      >
        <input
          id="element"
          class=${classMap({
            'form-control': true,
            'is-invalid': this._isInvalid,
        })}
          type="${this._obscure ? 'password' : 'text'}"
        />
        <div
          class="icon"
          @click="${this._switch}"
        ></div>
      </div>
    `;
    }
    _switch() {
        this._obscure = !this._obscure;
    }
};
__decorate([
    state()
], PasswordElement.prototype, "_obscure", void 0);
PasswordElement = __decorate([
    customElement('ire-password-input')
], PasswordElement);
//# sourceMappingURL=password.js.map