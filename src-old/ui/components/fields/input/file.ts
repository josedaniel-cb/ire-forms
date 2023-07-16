import { html, css } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { FileInputController } from '../../../../controllers/fields/input/file'
import { FieldElement } from '../../field'

@customElement('ire-file-input')
class FileInputElement extends FieldElement {
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
  static override get styles() {
    return [
      ...FieldElement.styles,
      css`
        #file {
          display: none;
        }

        #text {
          /* background-color: transparent;
          cursor: pointer; */
        }
      `,
    ]
  }

  // override controller!: FileInputController;
  declare controller: FileInputController

  @query('#text')
  text!: HTMLInputElement

  @query('#file')
  file!: HTMLInputElement

  fieldTemplate() {
    return html`
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
    `
  }

  override firstUpdated() {
    this.controller.connectElements(this.text, this.file)
    this.text.addEventListener('click', () => this._click())
  }

  protected _click() {
    this.file.click()
  }
}
