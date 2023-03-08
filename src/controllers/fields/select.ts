import { ControlType } from '../abstract-field'
import {
  AbstractSelect,
  AbstractSelectBuilderParams,
  AbstractSelectConstructorParams,
  AbstractSelectController,
  AbstractSelectExternalParams,
} from './abstract-select'
import { SimpleOption } from './select/options'

export interface Select
  extends AbstractSelect<any, SimpleOption<any>, HTMLSelectElement> {
  readonly placeholder?: string
}

export class SelectController
  extends AbstractSelectController<any, SimpleOption<any>, HTMLSelectElement>
  implements Select
{
  // readonly search: boolean;

  readonly placeholder?: string

  constructor(params: SelectConstructorParams<any>) {
    super(params)

    if (params.placeholder !== undefined) this.placeholder = params.placeholder
    // this.search = params.search !== undefined ? params.search : false;

    this.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.onFilled()
      }
    })
  }

  // HTML
  override connect(element: HTMLSelectElement): void {
    super.connect(element)

    // Subscribe to user changes
    element.addEventListener('input', () => {
      const i = this._getIndexFromElement(element)
      this._validateAndNotify(i)
    })
  }

  // https://stackoverflow.com/a/14976638/11026079
  protected _getIndexFromElement(element: HTMLSelectElement): number {
    if (element.selectedIndex === 0) {
      return this._defaultIndex
    }
    return element.selectedIndex - 1
  }

  protected _setIndexToElement(
    index: number,
    element: HTMLSelectElement
  ): void {
    element.selectedIndex = index + 1
  }
}

interface BuilderParams<T>
  extends AbstractSelectBuilderParams<T, SimpleOption<T>, HTMLSelectElement> {
  placeholder?: string
  // search?: boolean;
}

interface SelectExternalParams<T>
  extends BuilderParams<T>,
    AbstractSelectExternalParams<T, SimpleOption<T>, HTMLSelectElement> {
  controlType: 'select'
}

function makeSelectExternalParams<T>(
  params: BuilderParams<T>
): SelectExternalParams<T> {
  return { ...params, controlType: 'select' }
}

interface SelectConstructorParams<T>
  extends BuilderParams<T>,
    AbstractSelectConstructorParams<T, SimpleOption<T>, HTMLSelectElement> {}

export { makeSelectExternalParams }
export type { SelectExternalParams, SelectConstructorParams }
