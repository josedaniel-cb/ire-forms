import { HtmlInput } from '../../../ui/html-input'
import { ControlType } from '../../abstract-field'
import {
  AbstractSelect,
  AbstractSelectBuilderParams,
  AbstractSelectConstructorParams,
  AbstractSelectController,
  AbstractSelectExternalParams,
} from '../abstract-select'
import { SimpleOption } from './options'

export interface Radios
  extends AbstractSelect<any, SimpleOption<any>, HTMLElement> {}

export class RadiosController
  extends AbstractSelectController<any, SimpleOption<any>, HTMLElement>
  implements Radios
{
  constructor(params: RadiosConstructorParams<any>) {
    super(params)
    // this.renderedElementChanges.subscribe((element) => {
    //   HtmlInput.addEnterKeyListener(element, this.onFilled);
    // });
    this.valueChanges.subscribe((value) => {
      if (value !== null) {
        this.onFilled()
      }
    })
  }

  // HTML
  override connect(element: HTMLElement): void {
    super.connect(element)

    // Subscribe to user input
    // https://stackoverflow.com/a/55384108/11026079
    element.addEventListener('click', (event) => {
      if (event.target && (event.target as HTMLElement).matches('input')) {
        const i = this._getIndexFromElement(element)
        this._validateAndNotify(i)
      }
    })
  }

  protected _getIndexFromElement(element: HTMLElement): number {
    const radios = Array.from(element.querySelectorAll('input'))
    let i = 0
    while (i < radios.length) {
      if (radios[i].checked) return i
      i++
    }
    return this._defaultIndex
  }

  protected _setIndexToElement(index: number, element: HTMLElement): void {
    if (index !== this._defaultIndex) {
      element.querySelectorAll('input')[index].checked = true
    } else {
      const radios = Array.from(element.querySelectorAll('input'))
      let i = 0
      while (i < radios.length) {
        if (radios[i].checked) {
          radios[i].checked = false
          break
        }
        i++
      }
    }
  }

  override async focus() {
    const element = await this.elementAsync
    const firstRadio = element.querySelector('input')
    if (firstRadio !== null) {
      firstRadio.focus()
    } else {
      const rect = element.getBoundingClientRect()
      window.scrollTo(rect.left, rect.top)
    }
  }
}

interface BuilderParams<T>
  extends AbstractSelectBuilderParams<T, SimpleOption<T>, HTMLElement> {}

interface RadiosExternalParams<T>
  extends BuilderParams<T>,
    AbstractSelectExternalParams<T, SimpleOption<T>, HTMLElement> {
  controlType: 'radios'
}

interface RadiosConstructorParams<T>
  extends BuilderParams<T>,
    AbstractSelectConstructorParams<T, SimpleOption<T>, HTMLElement> {}

function makeRadiosExternalParams<T>(
  params: BuilderParams<T>,
): RadiosExternalParams<T> {
  return { ...params, controlType: 'radios' }
}

export { makeRadiosExternalParams }
export type { RadiosExternalParams, RadiosConstructorParams }
