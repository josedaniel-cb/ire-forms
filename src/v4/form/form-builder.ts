import { FieldBuilder } from '../fields/field-builder'
import { FormProps, FormController, FormChildren } from './form-controller'
import { FormDefinition } from './form-definition'

export class FormBuilder {
  static build<T extends FormDefinition>(params: T): FormProps<T> {
    const form = new FormController<T>({
      children: Object.entries(params.fields).reduce(
        (children, [key, value]) => {
          children[key] =
            'fields' in value
              ? FormBuilder.build(value)
              : FieldBuilder.build(value)
          return children
        },
        {} as FormChildren,
      ),
    })
    return form
  }
}
