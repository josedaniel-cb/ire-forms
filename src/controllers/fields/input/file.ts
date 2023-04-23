import { HtmlInput } from '../../../ui/html-input'
import { ControlType } from '../../abstract-field'
import {
  AbstractInput,
  AbstractInputController,
  AbstractSubInputBuilderParams,
  AbstractSubInputConstructorParams,
  AbstractSubInputExternalParams,
  InputType,
} from '../abstract-input'

export interface FileInput extends AbstractInput<File | null> {}

export class FileInputController
  extends AbstractInputController<File | null>
  implements FileInput
{
  readonly accept?: string
  readonly placeholder: string

  constructor(params: FileInputConstructorParams) {
    super({ ...params, type: InputType.File })

    this.accept = params.accept
    this.placeholder =
      params.placeholder !== undefined
        ? params.placeholder
        : 'Seleccione un archivo'

    // On filled events
    this.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.onFilled()
      }
    })
  }

  // Html
  connectElements(
    textElement: HTMLInputElement,
    fileElement: HTMLInputElement,
  ) {
    textElement.setAttribute('placeholder', this.placeholder)

    // Set attributes
    Object.keys(this._attributes.value).forEach((name) => {
      const value = this._attributes.value[name]
      textElement.setAttribute(name, value)
    })

    // Subscribe to attributes changes
    this._attributes.changes.subscribe((changesList) =>
      changesList.forEach((change) => {
        if (change.value !== undefined)
          textElement.setAttribute(change.name, change.value)
        else textElement.removeAttribute(change.name)
      }),
    )

    // Initialize value
    this._setValueToElement(this.value, textElement)

    // Manage validity
    textElement.addEventListener('focusout', () => {
      this.markAsTouched()
    })

    // Subscribe to user changes
    fileElement.addEventListener('input', () => {
      const value = this._getValueFromElement(fileElement)
      this._setValueToElement(value, textElement)
      this._validateAndNotify(value)
    })

    // On * Enter *
    HtmlInput.addEnterKeyListener(textElement, () => {
      if (this.value !== null) {
        this.onFilled()
      } else {
        textElement.click()
      }
    })

    this._elementNotifier.next(textElement)
  }

  protected _getValueFromElement(element: HTMLInputElement): File | null {
    return element.files !== null ? element.files[0] : null
  }

  protected _setValueToElement(
    value: File | null,
    element: HTMLInputElement,
  ): void {
    if (value === null) {
      element.setAttribute('placeholder', this.placeholder)
    } else {
      element.setAttribute('placeholder', value.name)
    }
  }

  protected _getDefaultValue(): File | null {
    return null
  }

  // override async focus() {
  //   super.focus();
  // }
}

interface BuilderParams extends AbstractSubInputBuilderParams<File | null> {
  accept?: string
  placeholder?: string
}

interface FileInputExternalParams
  extends BuilderParams,
    AbstractSubInputExternalParams<File | null> {
  controlType: 'fileInput'
}

function makeFileInputExternalParams(
  params: BuilderParams,
): FileInputExternalParams {
  return { ...params, controlType: 'fileInput' }
}

interface FileInputConstructorParams
  extends BuilderParams,
    AbstractSubInputConstructorParams<File | null> {}

// console.log('file.ts');
export { makeFileInputExternalParams }
export type { FileInputExternalParams, FileInputConstructorParams }
