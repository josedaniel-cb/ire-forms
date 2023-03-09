var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FieldElement } from '../../field';
let FileInputElement = class FileInputElement extends FieldElement {
    // static override styles = [
    //   ...FieldElement.styles,
    //   css`
    //     #file {
    //       display: none;
    //     }
    //     #text {
    //       background-color: transparent;
    //       cursor: pointer;
    //     }
    //   `,
    // ]
    // static override styles = FieldElement.styles
    static get styles() {
        return [
            ...FieldElement.styles,
            css `
        #file {
          display: none;
        }

        #text {
          /* background-color: transparent;
          cursor: pointer; */
        }
      `,
        ];
    }
    text;
    file;
    fieldTemplate() {
        return html `
      <div class="form-file">
        <input
          id="file"
          type="file"
          accept="${ifDefined(this.controller.accept)}"
        />
        <input
          id="text"
          class=${classMap({
            'form-control': true,
            'is-invalid': this._isInvalid,
        })}
          type="text"
          readonly
        />
        <div
          class="icon"
          @click=${this._click}
        ></div>
      </div>
    `;
    }
    firstUpdated() {
        this.controller.connectElements(this.text, this.file);
        this.text.addEventListener('click', () => this._click());
    }
    _click() {
        this.file.click();
    }
};
__decorate([
    query('#text')
], FileInputElement.prototype, "text", void 0);
__decorate([
    query('#file')
], FileInputElement.prototype, "file", void 0);
FileInputElement = __decorate([
    customElement('ire-file-input')
], FileInputElement);
//# sourceMappingURL=file.js.map