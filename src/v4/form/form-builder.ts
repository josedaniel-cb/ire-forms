import { Form } from './form-controller'
import { FormParams } from './trees'

export class FormBuilder {
  static build<T extends FormParams>(props: T): Form<T> {
    throw new Error('Method not implemented.')
  }
}
