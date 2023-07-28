import { FieldElement } from '../components/stateful/base/field-element'
import { BehaviorSubject } from 'rxjs'

export interface FieldUIState<E extends FieldElement> {
  // htmlElement: HTMLElement | null
  htmlElement: E | null

  label: string

  touched: boolean
}

export type ExternalFieldUIState<
  E extends FieldElement,
  U extends FieldUIState<E>,
> = Omit<U, 'htmlElement'> & {
  readonly htmlElement: HTMLElement | null
}

export class FieldUIStateBuilder {
  static proxy<E extends FieldElement, U extends FieldUIState<E>>({
    uiState,
    uiStateSubject: getUiStateSubject,
  }: { uiState: U; uiStateSubject: () => BehaviorSubject<U> }): U {
    const uiStateProxy = new Proxy<U>(uiState, {
      set: (target: U, property: symbol | string, newValue: U[keyof U]) => {
        // if (property === 'htmlElement') {
        //   console.warn('You cannot set htmlElement directly')
        //   return false
        // }
        target[property as keyof typeof target] = newValue
        const uiStateSubject = getUiStateSubject()
        uiStateSubject.next(uiStateProxy)
        return true
      },
    })
    return uiStateProxy
  }
}
