import { FormDefinitionLeaf } from '../form/form-definition'
import { FieldController } from './field-controller'
import { FieldValidator } from './field-validator'
import { MultiSelectFieldController } from './multiple-select-field/controller'
import { SelectFieldController } from './select-field/controller'
import { TextFieldController } from './text-field/controller'

export class FieldBuilder {
  static build(params: FormDefinitionLeaf): FieldController<any, any> {
    if (params.type === 'text') {
      const validator = new FieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const firstValue = params.value ?? ''
      const controller = new TextFieldController({
        state: {
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: params.enabled ?? true,
          htmlElement: null,
          label: params.label,
          placeholder: params.placeholder ?? null,
        },
        validator,
      })
      if (params.onValueChange) {
        controller.valueChanges.subscribe(params.onValueChange)
      }
      if (params.onRender) {
        controller.renderChanges.subscribe(params.onRender)
      }
      return controller
    }

    if (params.type === 'select') {
      const validator = new FieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const firstValue = params.value ?? null
      const controller = new SelectFieldController({
        state: {
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: params.enabled ?? true,
          htmlElement: null,
          label: params.label,
          options: params.options,
        },
        validator,
      })
      if (params.onValueChange) {
        controller.valueChanges.subscribe(params.onValueChange)
      }
      if (params.onRender) {
        controller.renderChanges.subscribe(params.onRender)
      }
      return controller
    }

    if (params.type === 'multi-select') {
      const validator = new FieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const firstValue = params.value ?? []
      const controller = new MultiSelectFieldController({
        state: {
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: params.enabled ?? true,
          htmlElement: null,
          label: params.label,
          options: params.options,
        },
        validator,
      })
      if (params.onValueChange) {
        controller.valueChanges.subscribe(params.onValueChange)
      }
      if (params.onRender) {
        controller.renderChanges.subscribe(params.onRender)
      }
      return controller
    }

    const { type } = params
    throw new Error(`Unknown field type: ${type}`)
  }
}
