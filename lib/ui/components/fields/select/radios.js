var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AbstractSelectElement } from '../select';
let RadiosElement = class RadiosElement extends AbstractSelectElement {
    static styles = AbstractSelectElement.styles;
    fieldTemplate() {
        return html `
      <div id="element">
        ${this.controller.options.map((option, index) => html `
            <div class="form-check">
              <input
                id="${index}"
                class="form-check-input"
                type="radio"
                name="_"
                value="${index}"
              />
              <label
                class="form-check-label"
                for="${index}"
              >
                ${option.label}
              </label>
            </div>
          `)}
      </div>
    `;
    }
};
RadiosElement = __decorate([
    customElement('ire-radios')
], RadiosElement);
//# sourceMappingURL=radios.js.map