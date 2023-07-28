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

import { FieldElement } from './base/field-element'
import { HTMLTemplateResult, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
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

@customElement('ire-select')
export class IreSelectElement extends FieldElement {
  protected _renderField(): HTMLTemplateResult {
    throw new Error('Method not implemented.')
  }
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
}

declare global {
  interface HTMLElementTagNameMap {
    'ire-select': IreSelectElement
  }
}
