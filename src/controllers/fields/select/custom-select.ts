import { CustomOption } from './options'
import { ControlType } from '../../abstract-field'
import {
  AbstractSelect,
  AbstractSelectBuilderParams,
  AbstractSelectConstructorParams,
  AbstractSelectController,
  AbstractSelectExternalParams,
} from '../abstract-select'

export interface CustomSelect
  extends AbstractSelect<any, CustomOption<any>, HTMLInputElement> {
  get placeholder(): string | null
  set placeholder(value: string | null)
}

export class CustomSelectController
  extends AbstractSelectController<any, CustomOption<any>, HTMLInputElement>
  implements CustomSelect
{
  constructor(params: CustomSelectConstructorParams<any>) {
    super(params)

    if (params.placeholder !== undefined) this.placeholder = params.placeholder

    this.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.onFilled()
      }
    })
  }

  get placeholder(): string | null {
    return this._attributes.get('placeholder')
  }

  set placeholder(value: string | null) {
    this._attributes.set('placeholder', value)
  }

  get validateAndNotify() {
    return this._validateAndNotify
  }

  get markAsUntouched() {
    return this._markAsUntouched
  }

  protected _setIndexToElement(index: number, _: HTMLInputElement): void {
    this.handleSetIndexToElement(index)
  }

  // Will be overwritten by CustomSelectElement
  handleSetIndexToElement(index: number) {}
}

export interface CustomSelectBuilderParams<T>
  extends AbstractSelectBuilderParams<T, CustomOption<T>, HTMLInputElement> {
  placeholder?: string
}

export interface CustomSelectExternalParams<T>
  extends CustomSelectBuilderParams<T>,
    AbstractSelectExternalParams<T, CustomOption<T>, HTMLInputElement> {
  controlType: 'customSelect'
}

export const makeCustomSelectExternalParams = <T>(
  params: CustomSelectBuilderParams<T>,
): CustomSelectExternalParams<T> => {
  return { ...params, controlType: 'customSelect' }
}

export interface CustomSelectConstructorParams<T>
  extends CustomSelectBuilderParams<T>,
    AbstractSelectConstructorParams<T, CustomOption<T>, HTMLInputElement> {}
