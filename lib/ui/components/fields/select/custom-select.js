var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { AbstractSelectElement } from '../select';
let CustomSelectElement = class CustomSelectElement extends AbstractSelectElement {
    static styles = AbstractSelectElement.styles;
    panel;
    collapsed = false;
    selectionIndex = -1;
    filteredOptions;
    // multiple = true
    connectedCallback() {
        super.connectedCallback();
        this.filteredOptions = Array.from(this.controller.options);
        this.controller.handleSetIndexToElement = (index) => {
            this.selectionIndex = index;
        };
    }
    fieldTemplate() {
        return html `
      <input
        id="element"
        class=${classMap({
            'form-select': true,
            'is-invalid': this._isInvalid,
        })}
        type="text"
        @input="${this._handleInput}"
        @click="${this._showPanel}"
        @focus="${this._showPanel}"
        @blur="${this._hidePanel}"
        @keydown="${this._handleKeyDown}"
      />

      <!-- <div
        class=${classMap({
            'form-control': true,
            'is-invalid': this._isInvalid,
        })}
        tabindex="0"
        @focus="${(e) => e.target.children.item(0).focus()}"
      >
        <input
          id="element"
          type="text"
          style="border: none; outline: none;"
          @input="${this._handleInput}"
          @click="${this._showPanel}"
          @focus="${this._showPanel}"
          @blur="${this._hidePanel}"
          @keydown="${this._handleKeyDown}"
        />
      </div> -->

      <div class="relative w-full">
        <div
          class="custom-select-panel"
          tabindex="0"
          style=${styleMap(this.collapsed
            ? {}
            : {
                opacity: '0',
                'pointer-events': 'none',
            })}
        >
          ${this.filteredOptions.map((option, i) => {
            return html `
              <div
                class=${classMap({
                item: true,
                selected: i === this.selectionIndex,
            })}
                @mousedown="${(e) => this._handleItemMouseDown(e, i)}"
              >
                ${this.itemTemplate(option)}
              </div>
            `;
        })}
          ${this.filteredOptions.length === 0
            ? html `
                <div class="empty-message">
                  Ninguna opción coincide con el criterio de búsqueda
                </div>
              `
            : undefined}
        </div>
      </div>
    `;
    }
    itemTemplate(option) {
        if (option.template !== undefined) {
            return option.template;
        }
        return html ` <div class="content">${option.textValue}</div> `;
    }
    _showPanel() {
        this.collapsed = true;
    }
    _hidePanel() {
        this.collapsed = false;
    }
    _handleInput(e) {
        this._showPanel();
        // Clear selection
        this.selectionIndex = -1;
        this.controller.validateAndNotify(-1);
        // Editing mode
        if (this.controller.touched) {
            this.controller.markAsUntouched();
        }
        const query = e.target.value.toLowerCase();
        this._filterOptions(query);
    }
    _filterOptions(query) {
        if (query.length > 0) {
            this.filteredOptions = this.controller.options.filter((o) => {
                const optionText = o.textValue
                    ? o.textValue.toLowerCase()
                    : `${o.value}`;
                return optionText.includes(query);
            });
        }
        else {
            this.filteredOptions = this.controller.options;
        }
    }
    _handleKeyDown(e) {
        switch (e.code) {
            case 'Escape':
                this._hidePanel();
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                this.selectionIndex += e.code === 'ArrowDown' ? 1 : -1;
                if (this.selectionIndex < 0) {
                    this.selectionIndex = 0;
                }
                else {
                    const n = this.filteredOptions.length;
                    if (this.selectionIndex >= n) {
                        this.selectionIndex = n - 1;
                    }
                }
                break;
            case 'Enter':
                this._hidePanel();
                this._filterOptions('');
                this._notifyChange(this.selectionIndex);
                break;
        }
    }
    _handleItemMouseDown(e, index) {
        e.preventDefault();
        e.stopPropagation();
        this.selectionIndex = index;
        this._hidePanel();
        this._filterOptions('');
        this._notifyChange(index);
    }
    _notifyChange(index) {
        // Fill field
        const option = this.controller.options[index];
        const text = option.textValue
            ? option.textValue.toLowerCase()
            : `${option.value}`;
        this.element.value = text;
        // Notify to controller
        this.controller.validateAndNotify(index);
    }
};
__decorate([
    query('.custom-select-panel')
], CustomSelectElement.prototype, "panel", void 0);
__decorate([
    state()
], CustomSelectElement.prototype, "collapsed", void 0);
__decorate([
    state()
], CustomSelectElement.prototype, "selectionIndex", void 0);
__decorate([
    state()
], CustomSelectElement.prototype, "filteredOptions", void 0);
CustomSelectElement = __decorate([
    customElement('ire-custom-select')
], CustomSelectElement);
//# sourceMappingURL=custom-select.js.map