import { Observable, Subject, takeUntil } from 'rxjs'

export type AttributesMap = { [key: string]: string }

export type AttributeChange = { name: string; value: string | undefined }

export abstract class AbstractAttributes {
  protected readonly _unsubscribe: Subject<void>

  protected _map: AttributesMap

  protected _changesNotifier: Subject<AttributeChange[]>

  constructor(map?: AttributesMap) {
    this._unsubscribe = new Subject<void>()
    this._map = map ?? {}
    this._changesNotifier = new Subject<AttributeChange[]>()
  }

  protected get _changes(): Observable<AttributeChange[]> {
    return this._changesNotifier.pipe(takeUntil(this._unsubscribe))
  }

  get value(): AttributesMap {
    return this._map
  }

  get(name: string): string | null {
    if (name in this._map) {
      return this._map[name]
    }
    return null
  }

  set(name: string, value: string | null): void {
    if (value !== null) {
      const change: AttributeChange = { name, value }
      this._map[change.name] = change.value!
      this._changesNotifier.next([change])
    } else {
      this.remove(name)
    }
  }

  getBoolean(name: string): boolean {
    return name in this._map
  }

  setBoolean(name: string, value = true): void {
    if (value) {
      this.set(name, '')
    } else {
      this.remove(name)
    }
  }

  getNumber(name: string): number | null {
    const value = this.get(name)
    if (value !== null) {
      return Number(value)
    }
    return null
  }

  setNumber(name: string, value: number | null): void {
    if (value !== null) {
      this.set(name, value.toString())
    } else {
      this.remove(name)
    }
  }

  getDate(name: string): Date | null {
    const value = this.get(name)
    if (value !== null) {
      return new Date(value)
    }
    return null
  }

  setDate(name: string, value: Date | null): void {
    if (value !== null) {
      this.set(name, value.toISOString().substring(0, 10))
    } else {
      this.remove(name)
    }
  }

  remove(name: string): void {
    if (name in this._map) {
      const change: AttributeChange = { name, value: undefined }
      delete this._map[change.name]
      this._changesNotifier.next([change])
    }
  }

  patch(attributes: AttributesMap): void {
    const changesList = Object.keys(attributes).map((name) => {
      const change: AttributeChange = {
        name,
        value: attributes[name],
      }
      this._map[change.name] = change.value!
      return change
    })

    this._changesNotifier.next(changesList)
  }

  protected _dispose(): void {
    this._unsubscribe.next()
    this._unsubscribe.complete()
  }
}

export class Attributes extends AbstractAttributes {
  get changes(): Observable<AttributeChange[]> {
    return this._changes
  }

  dispose(): void {
    super._dispose()
  }
}
