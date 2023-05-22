import { FieldBuilder } from '../fields/field-builder'
import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { TextFieldDefinition } from '../fields/text-field/controller'
import { Form, FormController, FormChildren } from './form-controller'
import { FormDefinition } from './form-definition'

export class FormBuilder {
  static build<T extends FormDefinition>(params: T): Form<T> {
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

  static fieldset<T extends FormDefinition>(params: T): T {
    return params
  }

  static text(
    builderParams: Omit<TextFieldDefinition, 'type'>,
  ): TextFieldDefinition {
    return {
      ...builderParams,
      type: 'text',
    }
  }

  static select<T extends NonNullable<unknown>>(
    builderParams: Omit<SelectFieldDefinition<T>, 'type'>,
  ): SelectFieldDefinition<T> {
    return {
      ...builderParams,
      type: 'select',
    }
  }

  static multiSelect<T extends NonNullable<unknown>>(
    builderParams: Omit<MultiSelectFieldDefinition<T>, 'type'>,
  ): MultiSelectFieldDefinition<T> {
    return {
      ...builderParams,
      type: 'multi-select',
    }
  }
}
