// import { BehaviorSubject, Subject } from 'rxjs'

// export interface FieldStateProps<T> {
export interface FieldState<T> {
  value: T

  label: string

  defaultValue?: T

  required?: boolean

  enabled?: boolean
}

// TODO: USE A PROXY

// export class FieldState<T> implements FieldStateProps<T> {
//   #value: T

//   #label: string

//   #defaultValue?: T

//   #required?: boolean

//   #enabled?: boolean

//   readonly #subject: Subject<FieldStateProps<T>>

//   constructor(params: FieldStateProps<T>) {
//     this.#value = params.value
//     this.#label = params.label
//     this.#defaultValue = params.defaultValue
//     this.#required = params.required
//     this.#enabled = params.enabled
//     this.#subject = new BehaviorSubject<FieldStateProps<T>>(this)
//   }

//   get value() {
//     return this.#value
//   }

//   set value(value: T) {
//     this.#value = value
//     this.#subject.next(this)
//   }

//   get label() {
//     return this.#label
//   }

//   set label(label: string) {
//     this.#label = label
//   }

//   get defaualtValue() {
//     return this.#defaultValue
//   }

//   set defaultValue(defaultValue: T | undefined) {
//     this.#defaultValue = defaultValue
//   }

//   get required() {
//     return this.#required
//   }

//   set required(required: boolean | undefined) {
//     this.#required = required
//   }

//   get enabled() {
//     return this.#enabled
//   }

//   set enabled(enabled: boolean | undefined) {
//     this.#enabled = enabled
//   }
// }
