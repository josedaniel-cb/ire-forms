import { BehaviorSubject } from 'rxjs'

export interface FieldUIState {
  htmlElement: HTMLElement | null

  label: string

  touched: boolean
}

export type ExternalFieldUIState<U extends FieldUIState> = Omit<
  U,
  'htmlElement'
> & {
  readonly htmlElement: HTMLElement | null
}

export class FieldUIStateBuilder {
  static proxy<U extends FieldUIState>({
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
