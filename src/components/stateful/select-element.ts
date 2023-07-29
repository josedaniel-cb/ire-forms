// import { html } from 'lit'
// import { customElement } from 'lit/decorators.js'
// import { classMap } from 'lit/directives/class-map.js'
// import { AbstractSelectController } from '../../../controllers/fields/abstract-select'
// import { SelectController } from '../../../controllers/fields/select'
// import { FieldElement } from '../field'

// export abstract class AbstractSelectElement extends FieldElement {
//   static override styles = FieldElement.styles

//   declare controller: AbstractSelectController

//   override connectedCallback(): void {
//     super.connectedCallback()
//     this.controller.optionsChanges.subscribe(() => this.requestUpdate())
//   }
// }

// @customElement('ire-select')
// class SelectElement extends AbstractSelectElement {
//   static override styles = AbstractSelectElement.styles

//   declare controller: SelectController

//   fieldTemplate() {
//     return html`
//       <select
//         id="element"
//         class=${classMap({
//           'form-select': true,
//           'is-invalid': this._isInvalid,
//         })}
//       >
//         <option hidden>
//           ${
//             this.controller.placeholder !== undefined
//               ? this.controller.placeholder
//               : 'Seleccione una opción'
//           }
//         </option>
//         ${this.controller.options.map(
//           (option, index) => html`
//             <option value="${index}">${option.label}</option>
//           `,
//         )}
//       </select>
//     `
//   }
// }

import {
  SelectFieldController,
  SelectFieldUIState,
  SelectFieldValueState,
} from '../../fields/select-field/controller'
import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ire-select')
export class IreSelectElement extends FieldElement {
  static override styles = FieldElement.styles

  @query('select')
  selectEl!: HTMLSelectElement

  @property({ attribute: false })
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  override controller!: SelectFieldController<any>

  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  #valueState?: SelectFieldValueState<any>

  #uiState?: SelectFieldUIState

  protected _renderField(): HTMLTemplateResult {
    const touched = this.#uiState?.touched ?? false
    const errorMessage =
      this.#valueState?.validationResult.errorMessage ?? undefined
    return html`
        <select
          class=${classMap({
            'form-select': true,
            'is-invalid': touched && errorMessage !== undefined,
          })}
          ?disabled="${!(this.#valueState?.enabled ?? true)}"
          @input="${this.#handleInput}"
          @blur="${this.#handleBlur}"
        >
          <option hidden>
            ${
              this.#uiState?.placeholder
                ? this.#uiState.placeholder
                : 'Choose an option'
            }
          </option>
          ${this.#valueState?.options.map(
            ({ label }, index) => html`
              <option value="${index}">${label}</option>
            `,
          )}
        </select>
      ${
        touched && errorMessage !== undefined
          ? this._renderValidationMessage(errorMessage)
          : undefined
      }
      `
  }

  override firstUpdated(): void {
    this.controller.connect(this)

    // Subscribe to value and validation changes
    this.controller.valueStateChanges.subscribe((state) => {
      this.#valueState = state
      if (state.index !== null) {
        this.selectEl.selectedIndex = state.index + 1 // Add 1 to skip the placeholder
      } else {
        this.selectEl.selectedIndex = 0
      }
      this.requestUpdate()
    })

    // Subscribe to UI changes
    this.controller.uiStateChanges.subscribe((state) => {
      this.#uiState = state
      this.requestUpdate()
    })
  }

  #handleInput(_: Event): void {
    if (!this.#valueState) return
    const selectedIndex = this.selectEl.selectedIndex - 1 // Omit the placeholder
    this.controller.valueState.index = selectedIndex
  }

  #handleBlur(_: Event): void {
    this.controller.markAsTouched()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-select': IreSelectElement
  }
}
