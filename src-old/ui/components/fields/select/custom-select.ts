import { css, html } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { CustomOption } from '../../../../controllers/fields/select/options'
import { CustomSelectController } from '../../../../controllers/fields/select/custom-select'
import { AbstractSelectElement } from '../select'

@customElement('ire-custom-select')
class CustomSelectElement extends AbstractSelectElement {
  static override styles = AbstractSelectElement.styles

  @query('.custom-select-panel')
  panel!: HTMLElement

  declare controller: CustomSelectController

  @state()
  collapsed = false

  @state()
  selectionIndex = -1

  @state()
  filteredOptions!: CustomOption<any>[]

  // multiple = true

  override connectedCallback() {
    super.connectedCallback()
    this.filteredOptions = Array.from(this.controller.options)
    this.controller.handleSetIndexToElement = (index) => {
      this.selectionIndex = index
    }
  }

  fieldTemplate() {
    return html`
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
        @focus="${(e: Event) =>
          ((e.target as HTMLElement).children.item(0)! as HTMLElement).focus()}"
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
          style=${styleMap(
            this.collapsed
              ? {}
              : {
                  opacity: '0',
                  'pointer-events': 'none',
                },
          )}
        >
          ${this.filteredOptions.map((option, i) => {
            return html`
              <div
                class=${classMap({
                  item: true,
                  selected: i === this.selectionIndex,
                })}
                @mousedown="${(e: Event) => this._handleItemMouseDown(e, i)}"
              >
                ${this.itemTemplate(option)}
              </div>
            `
          })}
          ${
            this.filteredOptions.length === 0
              ? html`
                <div class="empty-message">
                  Ninguna opción coincide con el criterio de búsqueda
                </div>
              `
              : undefined
          }
        </div>
      </div>
    `
  }

  itemTemplate(option: CustomOption<any>) {
    if (option.template !== undefined) {
      return option.template
    }
    return html` <div class="content">${option.textValue}</div> `
  }

  private _showPanel() {
    this.collapsed = true
  }

  private _hidePanel() {
    this.collapsed = false
  }

  private _handleInput(e: InputEvent) {
    this._showPanel()

    // Clear selection
    this.selectionIndex = -1
    this.controller.validateAndNotify(-1)

    // Editing mode
    if (this.controller.touched) {
      this.controller.markAsUntouched()
    }

    const query = (e.target as HTMLInputElement).value.toLowerCase()
    this._filterOptions(query)
  }

  private _filterOptions(query: string) {
    if (query.length > 0) {
      this.filteredOptions = this.controller.options.filter((o) => {
        const optionText = o.textValue
          ? o.textValue.toLowerCase()
          : `${o.value}`
        return optionText.includes(query)
      })
    } else {
      this.filteredOptions = this.controller.options
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'Escape':
        this._hidePanel()
        break
      case 'ArrowUp':
      case 'ArrowDown':
        this.selectionIndex += e.code === 'ArrowDown' ? 1 : -1
        if (this.selectionIndex < 0) {
          this.selectionIndex = 0
        } else {
          const n = this.filteredOptions.length
          if (this.selectionIndex >= n) {
            this.selectionIndex = n - 1
          }
        }
        break
      case 'Enter':
        this._hidePanel()
        this._filterOptions('')
        this._notifyChange(this.selectionIndex)
        break
    }
  }

  private _handleItemMouseDown(e: Event, index: number) {
    e.preventDefault()
    e.stopPropagation()

    this.selectionIndex = index
    this._hidePanel()
    this._filterOptions('')
    this._notifyChange(index)
  }

  private _notifyChange(index: number) {
    // Fill field
    const option = this.controller.options[index]
    const text = option.textValue
      ? option.textValue.toLowerCase()
      : `${option.value}`
    ;(this.element as HTMLInputElement).value = text

    // Notify to controller
    this.controller.validateAndNotify(index)
  }
}
