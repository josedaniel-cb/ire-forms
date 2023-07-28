import { FieldBuilder } from '../fields/field-builder'
import { MultiSelectFieldDefinition } from '../fields/multiple-select-field/controller'
import { SelectFieldDefinition } from '../fields/select-field/controller'
import { TextFieldDefinition } from '../fields/text-field/controller'
import { FormBuilderUI } from '../form-ui/form-builder-ui'
import {
  // RootFormBuildDefinition,
  FormBuildDefinition,
} from './form-build-definition'
import { Form, FormController, FormControllerChildren } from './form-controller'
import { FormDefinition } from './form-definition'
import { Subject } from 'rxjs'

type FormBuilderConfig = {
  stylesheets: string[]
}

export class FormBuilder {
  static readonly uiConfig = FormBuilderUI.default()

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

  static multiSelect<T extends NonNullable<unknown>>(
    builderParams: Omit<MultiSelectFieldDefinition<T>, 'type'>,
  ): MultiSelectFieldDefinition<T> {
    return {
      ...builderParams,
      type: 'multi-select',
    }
  }

  static #config: FormBuilderConfig = {
    stylesheets: [],
  }

  static get config() {
    return FormBuilder.#config
  }

  static patchConfig(config: Partial<FormBuilderConfig>) {
    // FormBuilder.#settings = settings
    Object.entries(config).forEach(([key, value]) => {
      if (key in FormBuilder.#config) {
        FormBuilder.#config[key as keyof FormBuilderConfig] = value
      }
    })
  }
}
