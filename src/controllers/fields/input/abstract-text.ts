import { HtmlInput } from '../../../ui/html-input'
import {
  AbstractInputController,
  AbstractSubInputBuilderParams,
  AbstractSubInputExternalParams,
  AbstractSubInputConstructorParams,
  InputType,
  AbstractInput,
} from '../abstract-input'

export interface AbstractTextInput extends AbstractInput<string> {
  get placeholder(): string | null
  set placeholder(value: string | null)
}

export abstract class AbstractTextInputController
  extends AbstractInputController<string>
  implements AbstractTextInput
{
  // readonly upperCaseOnly: boolean;

  constructor(params: AbstractTextInputConstructorParams) {
    super(params)

    if (params.maxlength !== undefined) {
      this.maxlength = params.maxlength
    }
    if (params.placeholder !== undefined) this.placeholder = params.placeholder
  }

  override connect(element: HTMLInputElement) {
    super.connect(element)
    HtmlInput.addEnterKeyListener(element, this.onFilled)
  }

  protected _getValueFromElement(element: HTMLInputElement): string {
    return element.value
  }

  protected _setValueToElement(value: string, element: HTMLInputElement): void {
    element.value = value
  }

  protected _getDefaultValue(): string {
    return ''
  }

  get placeholder(): string | null {
    return this._attributes.get('placeholder')
  }

  set placeholder(value: string | null) {
    this._attributes.set('placeholder', value)
  }

  get maxlength(): number | null {
    return this._attributes.getNumber('maxlength')
  }

  set maxlength(value: number | null) {
    this._attributes.setNumber('maxlength', value)
  }

  // get minlength(): number | null {
  //   return this._attributes.getNumber('minlength');
  // }

  // set minlength(value: number | null) {
  //   this._attributes.setNumber('minlength', value);
  // }
}

interface AbstractTextInputBuilderParams
  extends AbstractSubInputBuilderParams<string> {
  maxlength?: number
  // minlength?: number;
  placeholder?: string
  // upperCaseOnly?: boolean;
}

interface AbstractTextInputExternalParams
  extends AbstractTextInputBuilderParams,
    AbstractSubInputExternalParams<string> {}

interface AbstractTextInputConstructorParams
  extends AbstractTextInputBuilderParams,
    AbstractSubInputConstructorParams<string> {
  type: InputType
}

export type {
  AbstractTextInputBuilderParams,
  AbstractTextInputExternalParams,
  AbstractTextInputConstructorParams,
}
