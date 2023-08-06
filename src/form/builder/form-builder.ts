import { FieldBuilder } from '../../fields/builder/field-builder'
import { CheckboxesFieldDefinition } from '../../fields/controllers/checkboxes-controller'
import { ChipsFieldDefinition } from '../../fields/controllers/chips-controller'
import { SelectFieldDefinition } from '../../fields/controllers/native-select-controller'
import { TextFieldDefinition } from '../../fields/controllers/text-controller'
import {
  Form,
  FormController,
  FormControllerChildren,
} from '../controller/form-controller'
import { FormDefinition } from '../definition/form-definition'
import { FormBuildDefinition } from './form-build-definition'
import { Subject } from 'rxjs'

export class FormBuilder {
  static #build<T extends FormDefinition>(
    definition: FormBuildDefinition<T>,
    unsubscribeSubject: Subject<void>,
  ): FormController<T> {
    const form = new FormController<T>({
      unsubscribeSubject,
      uiConfig: definition.uiConfig,
      children: Object.entries(definition.fields).reduce(
        (children, [key, value]) => {
          children[key] =
            'fields' in value
              ? FormBuilder.#build(value, unsubscribeSubject)
              : FieldBuilder.build(value, unsubscribeSubject)
          return children
        },
        {} as FormControllerChildren,
      ),
    })

    return form
  }

  static build<T extends FormDefinition>(
    params: FormBuildDefinition<T>,
  ): Form<T> {
    const unsubscribeSubject = new Subject<void>()
    return FormBuilder.#build<T>(params, unsubscribeSubject)
  }

  static fieldset<T extends FormDefinition>(
    params: FormBuildDefinition<T>,
  ): FormBuildDefinition<T> {
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

  static chips<T extends NonNullable<unknown>>(
    builderParams: Omit<ChipsFieldDefinition<T>, 'type'>,
  ): ChipsFieldDefinition<T> {
    return {
      ...builderParams,
      type: 'chips',
    }
  }

  static checkboxes<T extends NonNullable<unknown>>(
    builderParams: Omit<CheckboxesFieldDefinition<T>, 'type'>,
  ): CheckboxesFieldDefinition<T> {
    return {
      ...builderParams,
      type: 'checkboxes',
    }
  }
}
