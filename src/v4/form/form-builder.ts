import { FieldBuilder } from '../fields/field-builder'
import { MultiSelectFieldBuilderParams } from '../fields/multiple-select-field/controller'
import { SelectFieldBuilderParams } from '../fields/select-field/controller'
import { TextFieldBuilderParams } from '../fields/text-field/controller'
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

  static fieldset<T extends FormDefinition>(params: T): T {
    return params
  }

  static text(
    builderParams: Omit<TextFieldBuilderParams, 'type'>,
  ): TextFieldBuilderParams {
    return {
      ...builderParams,
      type: 'text',
    }
  }

  static select<T extends NonNullable<unknown>>(
    builderParams: Omit<SelectFieldBuilderParams<T>, 'type'>,
  ): SelectFieldBuilderParams<T> {
    return {
      ...builderParams,
      type: 'select',
    }
  }

  static multiSelect<T extends NonNullable<unknown>>(
    builderParams: Omit<MultiSelectFieldBuilderParams<T>, 'type'>,
  ): MultiSelectFieldBuilderParams<T> {
    return {
      ...builderParams,
      type: 'multi-select',
    }
  }
}
