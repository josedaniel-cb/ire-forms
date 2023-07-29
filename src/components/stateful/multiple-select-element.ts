// import { css, html } from 'lit'
// import { customElement, query, state } from 'lit/decorators.js'
// import { classMap } from 'lit/directives/class-map.js'
// import { styleMap } from 'lit/directives/style-map.js'
// import { MultipleSelectController } from '../../../controllers/fields/multiple-select'
// import { CustomOption } from '../../../controllers/fields/select/options'
// import { FieldElement } from '../field'

// @customElement('ire-multi-select')
// class MultipleSelectElement extends FieldElement {
//   static override styles = [
//     ...FieldElement.styles,
//     css`
//       .form-control {
//         display: inline-flex;
//         flex-wrap: wrap;
//         gap: 0.5rem;
//       }

//       /* .form-control > * {
//         margin-right: 0.5em;
//       } */

//       .form-control:last-child {
//         margin-right: 0;
//       }

//       .chip {
//         color: white;
//         background-color: rgb(99, 102, 241);
//         border-radius: 1rem;

//         padding: 0 0.5em;
//         min-width: 1rem;

//         display: flex;
//         align-items: center;
//         cursor: default;
//       }

//       .chip__x {
//         height: 1rem;
//         aspect-ratio: 1 / 1;
//         background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-x-circle' viewBox='0 0 16 16'>  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>");
//         background-repeat: no-repeat;
//         background-size: 75%;
//         background-position: center;
//         margin-left: 0.25em;
//         cursor: pointer;
//       }

//       .chip__text {
//       }

//       input {
//         flex-grow: 1;
//         border: none;
//         outline: none;
//       }
//     `,
//   ]

//   declare controller: MultipleSelectController<never>

//   @query('.custom-select-panel')
//   panel!: HTMLElement

//   @query('input')
//   input!: HTMLInputElement

//   @state()
//   allowInput = true

//   @state()
//   collapsed = false

//   @state()
//   selectionIndex = -1

//   @state()
//   value: boolean[] = []

//   @state()
//   options: CustomOption<any>[] = []

//   @state()
//   filteredOptions: {
//     option: CustomOption<any>
//     index: number
//   }[] = []

//   override connectedCallback() {
//     super.connectedCallback()
//     this.controller.optionsChanges.subscribe(async () => {
//       this.options = this.controller.options
//       this.value = this.controller.value
//     })
//   }

//   override firstUpdated() {
//     super.firstUpdated()
//     this.controller.handleSetValueToElement = (value) =>
//       this.setLocalValueFromExternal(value)
//     this.controller.handleClear = () => (this.input.value = '')
//   }

//   setLocalValueFromExternal(value: boolean[]) {
//     this.value = value
//     this.allowInput = !(
//       this.value.length > 0 && this.value.every((selected) => selected)
//     )
//   }

//   notifyLocalValueToController() {
//     this.allowInput = !(
//       this.value.length > 0 && this.value.every((selected) => selected)
//     )
//   }

//   fieldTemplate() {
//     console.log({
//       options: this.options,
//       value: this.value,
//     })

//     return html`
//       <div
//         id="element"
//         class=${classMap({
//           'form-control': true,
//           'is-invalid': this._isInvalid,
//         })}
//         style="${styleMap({
//           cursor: this.allowInput ? 'text' : undefined,
//         })}"
//         tabindex="0"
//         @focus="${() => this.input.focus()}"
//       >
//         ${
//           this.options.length === this.value.length
//             ? this.options.map((o, i) =>
//                 this.value[i]
//                   ? html`
//                     <div class="chip">
//                       <div class="chip__text">
//                         ${o.textValue ?? `${o.value}`}
//                       </div>
//                       <div
//                         class="chip__x"
//                         @mousedown="${(e: Event) => e.preventDefault()}"
//                         @click="${() => this._removeItem(i)}"
//                       ></div>
//                     </div>
//                   `
//                   : undefined,
//               )
//             : undefined
//         }
//         <input
//           type="text"
//           class="${classMap({ hidden: !this.allowInput })}"
//           @input="${this._handleInput}"
//           @click="${this._showPanel}"
//           @focus="${this._showPanel}"
//           @blur="${this._hidePanel}"
//           @keydown="${this._handleKeyDown}"
//         />
//       </div>

//       <div class="relative w-full">
//         <div
//           @click="${this._showPanel}"
//           @focus="${this._showPanel}"
//           @scroll="${this._showPanel}"
//           @blur="${this._hidePanel}"
//           class="custom-select-panel"
//           tabindex="0"
//           style=${styleMap(
//             this.collapsed
//               ? {}
//               : {
//                   opacity: '0',
//                   'pointer-events': 'none',
//                 },
//           )}
//         >
//           ${this.filteredOptions.map(({ option, index }) => {
//             return html`
//               <div
//                 class=${classMap({
//                   item: true,
//                   selected: index === this.selectionIndex,
//                 })}
//                 @mousedown="${(e: Event) => this._handleItemMouseDown(e, index)}"
//               >
//                 ${this.itemTemplate(option)}
//               </div>
//             `
//           })}
//           ${
//             this.filteredOptions.length === 0
//               ? html`
//                 <div class="empty-message">
//                   Ninguna opción coincide con el criterio de búsqueda
//                 </div>
//               `
//               : undefined
//           }
//         </div>
//       </div>
//     `
//   }

//   itemTemplate(option: CustomOption<any>) {
//     if (option.template !== undefined) {
//       return option.template
//     }
//     return html`
//       <div class="content">${option.textValue ?? `${option.value}`}</div>
//     `
//   }

//   private _showPanel() {
//     this.collapsed = true
//     this._filterOptions('')
//   }

//   private _hidePanel() {
//     this.collapsed = false
//   }

//   private _handleInput() {
//     // Clear selection
//     this.selectionIndex = -1

//     this._showPanel()

//     // Editing mode
//     if (this.controller.touched) {
//       this.controller.markAsUntouched()
//     }

//     this._filterOptions()
//   }

//   private _filterOptions(query?: string) {
//     if (query === undefined) {
//       query = this.input.value.toLowerCase()
//     }
//     let filtered = this.options.map((option, index) => ({
//       option,
//       index,
//     }))
//     filtered = filtered.filter(({ index }) => !this.value[index])
//     if (query.length > 0) {
//       filtered = filtered.filter(({ option }) => {
//         const optionText = (option.textValue ?? `${option.value}`).toLowerCase()
//         return optionText.includes(query!)
//       })
//     }
//     this.filteredOptions = filtered
//   }

//   private _handleKeyDown(e: KeyboardEvent) {
//     switch (e.code) {
//       case 'Escape':
//         this._hidePanel()
//         break
//       case 'ArrowUp':
//       case 'ArrowDown':
//         this.selectionIndex += e.code === 'ArrowDown' ? 1 : -1
//         if (this.selectionIndex < 0) {
//           this.selectionIndex = 0
//         } else {
//           const n = this.filteredOptions.length
//           if (this.selectionIndex >= n) {
//             this.selectionIndex = n - 1
//           }
//         }
//         break
//       case 'Enter':
//         this._hidePanel()
//         this._selectOption(this.selectionIndex)
//         break
//     }
//   }

//   private _handleItemMouseDown(e: Event, index: number) {
//     e.preventDefault()
//     e.stopPropagation()

//     this._hidePanel()
//     this._selectOption(index)
//   }

//   private _selectOption(index: number) {
//     this.selectionIndex = -1

//     this.value[index] = true
//     this.notifyLocalValueToController()
//     // this._filterOptions('')

//     this.controller.validateAndNotify(this.value)
//   }

//   private _removeItem(index: number) {
//     this.value[index] = false
//     this.notifyLocalValueToController()
//     this._hidePanel()
//     this.controller.validateAndNotify(this.value)
//   }
// }

import { FieldElement } from './base/field-element'
// import { MultipleSelectController } from '../../../controllers/fields/multiple-select'
// import { CustomOption } from '../../../controllers/fields/select/options'
// import { FieldElement } from '../field'
import { HTMLTemplateResult, css, html } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

@customElement('ire-multi-select')
export class IreMultiSelectElement extends FieldElement {
  protected _renderField(): HTMLTemplateResult {
    throw new Error('Method not implemented.')
  }
  //   static override styles = [
  //     ...FieldElement.styles,
  //     css`
  //       .form-control {
  //         display: inline-flex;
  //         flex-wrap: wrap;
  //         gap: 0.5rem;
  //       }
  //       /* .form-control > * {
  //         margin-right: 0.5em;
  //       } */
  //       .form-control:last-child {
  //         margin-right: 0;
  //       }
  //       .chip {
  //         color: white;
  //         background-color: rgb(99, 102, 241);
  //         border-radius: 1rem;
  //         padding: 0 0.5em;
  //         min-width: 1rem;
  //         display: flex;
  //         align-items: center;
  //         cursor: default;
  //       }
  //       .chip__x {
  //         height: 1rem;
  //         aspect-ratio: 1 / 1;
  //         background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-x-circle' viewBox='0 0 16 16'>  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/>  <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/></svg>");
  //         background-repeat: no-repeat;
  //         background-size: 75%;
  //         background-position: center;
  //         margin-left: 0.25em;
  //         cursor: pointer;
  //       }
  //       .chip__text {
  //       }
  //       input {
  //         flex-grow: 1;
  //         border: none;
  //         outline: none;
  //       }
  //     `,
  //   ]
  //   declare controller: MultipleSelectController<never>
  //   @query('.custom-select-panel')
  //   panel!: HTMLElement
  //   @query('input')
  //   input!: HTMLInputElement
  //   @state()
  //   allowInput = true
  //   @state()
  //   collapsed = false
  //   @state()
  //   selectionIndex = -1
  //   @state()
  //   value: boolean[] = []
  //   @state()
  //   options: CustomOption<any>[] = []
  //   @state()
  //   filteredOptions: {
  //     option: CustomOption<any>
  //     index: number
  //   }[] = []
  //   override connectedCallback() {
  //     super.connectedCallback()
  //     this.controller.optionsChanges.subscribe(async () => {
  //       this.options = this.controller.options
  //       this.value = this.controller.value
  //     })
  //   }
  //   override firstUpdated() {
  //     super.firstUpdated()
  //     this.controller.handleSetValueToElement = (value) =>
  //       this.setLocalValueFromExternal(value)
  //     this.controller.handleClear = () => (this.input.value = '')
  //   }
  //   setLocalValueFromExternal(value: boolean[]) {
  //     this.value = value
  //     this.allowInput = !(
  //       this.value.length > 0 && this.value.every((selected) => selected)
  //     )
  //   }
  //   notifyLocalValueToController() {
  //     this.allowInput = !(
  //       this.value.length > 0 && this.value.every((selected) => selected)
  //     )
  //   }
  //   fieldTemplate() {
  //     console.log({
  //       options: this.options,
  //       value: this.value,
  //     })
  //     return html`
  //       <div
  //         id="element"
  //         class=${classMap({
  //           'form-control': true,
  //           'is-invalid': this._isInvalid,
  //         })}
  //         style="${styleMap({
  //           cursor: this.allowInput ? 'text' : undefined,
  //         })}"
  //         tabindex="0"
  //         @focus="${() => this.input.focus()}"
  //       >
  //         ${
  //           this.options.length === this.value.length
  //             ? this.options.map((o, i) =>
  //                 this.value[i]
  //                   ? html`
  //                     <div class="chip">
  //                       <div class="chip__text">
  //                         ${o.textValue ?? `${o.value}`}
  //                       </div>
  //                       <div
  //                         class="chip__x"
  //                         @mousedown="${(e: Event) => e.preventDefault()}"
  //                         @click="${() => this._removeItem(i)}"
  //                       ></div>
  //                     </div>
  //                   `
  //                   : undefined,
  //               )
  //             : undefined
  //         }
  //         <input
  //           type="text"
  //           class="${classMap({ hidden: !this.allowInput })}"
  //           @input="${this._handleInput}"
  //           @click="${this._showPanel}"
  //           @focus="${this._showPanel}"
  //           @blur="${this._hidePanel}"
  //           @keydown="${this._handleKeyDown}"
  //         />
  //       </div>
  //       <div class="relative w-full">
  //         <div
  //           @click="${this._showPanel}"
  //           @focus="${this._showPanel}"
  //           @scroll="${this._showPanel}"
  //           @blur="${this._hidePanel}"
  //           class="custom-select-panel"
  //           tabindex="0"
  //           style=${styleMap(
  //             this.collapsed
  //               ? {}
  //               : {
  //                   opacity: '0',
  //                   'pointer-events': 'none',
  //                 },
  //           )}
  //         >
  //           ${this.filteredOptions.map(({ option, index }) => {
  //             return html`
  //               <div
  //                 class=${classMap({
  //                   item: true,
  //                   selected: index === this.selectionIndex,
  //                 })}
  //                 @mousedown="${(e: Event) => this._handleItemMouseDown(e, index)}"
  //               >
  //                 ${this.itemTemplate(option)}
  //               </div>
  //             `
  //           })}
  //           ${
  //             this.filteredOptions.length === 0
  //               ? html`
  //                 <div class="empty-message">
  //                   Ninguna opción coincide con el criterio de búsqueda
  //                 </div>
  //               `
  //               : undefined
  //           }
  //         </div>
  //       </div>
  //     `
  //   }
  //   itemTemplate(option: CustomOption<any>) {
  //     if (option.template !== undefined) {
  //       return option.template
  //     }
  //     return html`
  //       <div class="content">${option.textValue ?? `${option.value}`}</div>
  //     `
  //   }
  //   private _showPanel() {
  //     this.collapsed = true
  //     this._filterOptions('')
  //   }
  //   private _hidePanel() {
  //     this.collapsed = false
  //   }
  //   private _handleInput() {
  //     // Clear selection
  //     this.selectionIndex = -1
  //     this._showPanel()
  //     // Editing mode
  //     if (this.controller.touched) {
  //       this.controller.markAsUntouched()
  //     }
  //     this._filterOptions()
  //   }
  //   private _filterOptions(query?: string) {
  //     if (query === undefined) {
  //       query = this.input.value.toLowerCase()
  //     }
  //     let filtered = this.options.map((option, index) => ({
  //       option,
  //       index,
  //     }))
  //     filtered = filtered.filter(({ index }) => !this.value[index])
  //     if (query.length > 0) {
  //       filtered = filtered.filter(({ option }) => {
  //         const optionText = (option.textValue ?? `${option.value}`).toLowerCase()
  //         return optionText.includes(query!)
  //       })
  //     }
  //     this.filteredOptions = filtered
  //   }
  //   private _handleKeyDown(e: KeyboardEvent) {
  //     switch (e.code) {
  //       case 'Escape':
  //         this._hidePanel()
  //         break
  //       case 'ArrowUp':
  //       case 'ArrowDown':
  //         this.selectionIndex += e.code === 'ArrowDown' ? 1 : -1
  //         if (this.selectionIndex < 0) {
  //           this.selectionIndex = 0
  //         } else {
  //           const n = this.filteredOptions.length
  //           if (this.selectionIndex >= n) {
  //             this.selectionIndex = n - 1
  //           }
  //         }
  //         break
  //       case 'Enter':
  //         this._hidePanel()
  //         this._selectOption(this.selectionIndex)
  //         break
  //     }
  //   }
  //   private _handleItemMouseDown(e: Event, index: number) {
  //     e.preventDefault()
  //     e.stopPropagation()
  //     this._hidePanel()
  //     this._selectOption(index)
  //   }
  //   private _selectOption(index: number) {
  //     this.selectionIndex = -1
  //     this.value[index] = true
  //     this.notifyLocalValueToController()
  //     // this._filterOptions('')
  //     this.controller.validateAndNotify(this.value)
  //   }
  //   private _removeItem(index: number) {
  //     this.value[index] = false
  //     this.notifyLocalValueToController()
  //     this._hidePanel()
  //     this.controller.validateAndNotify(this.value)
  //   }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-multi-select': IreMultiSelectElement
  }
}
