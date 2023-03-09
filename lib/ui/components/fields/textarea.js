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
let TextAreaElement = class TextAreaElement extends FieldElement {
    static styles = FieldElement.styles;
    fieldTemplate() {
        return html `
      <textarea
        id="element"
        class=${classMap({
            'form-control': true,
            'is-invalid': this._isInvalid,
        })}
      >
      </textarea>
    `;
    }
};
TextAreaElement = __decorate([
    customElement('ire-textarea')
], TextAreaElement);
//# sourceMappingURL=textarea.js.map