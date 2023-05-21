import { FormDefinitionLeaf } from '../form/form-definition'
import { FieldController } from './field-controller'
import { FieldValidator } from './field-validator'
import { MultiSelectFieldController } from './multiple-select-field/controller'
import { SelectFieldController } from './select-field/controller'
import { TextFieldController } from './text-field/controller'

export class FieldBuilder {
  static build(params: FormDefinitionLeaf): FieldController<any, any> {
    if (params.type === 'text') {
      const {
        type,
        value,
        onValueChange,
        required,
        validators,
        enabled,
        onRender,
        ...partialState
      } = params
      const validator = new FieldValidator({
        required,
        validators,
      })
      const firstValue = value ?? ''
      const controller = new TextFieldController({
        state: {
          ...partialState,
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: enabled ?? true,
          htmlElement: null,
        },
        validator,
      })
      if (onValueChange) {
        controller.valueChanges.subscribe(onValueChange)
      }
      if (onRender) {
        controller.renderChanges.subscribe(onRender)
      }
      return controller
    }

    if (params.type === 'select') {
      const {
        type,
        value,
        onValueChange,
        required,
        validators,
        enabled,
        onRender,
        ...partialState
      } = params
      const validator = new FieldValidator({
        required,
        validators,
      })
      const firstValue = value ?? null
      const controller = new SelectFieldController({
        state: {
          ...partialState,
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: enabled ?? true,
          htmlElement: null,
        },
        validator,
      })
      if (onValueChange) {
        controller.valueChanges.subscribe(onValueChange)
      }
      if (onRender) {
        controller.renderChanges.subscribe(onRender)
      }
      return controller
    }

    if (params.type === 'multi-select') {
      const {
        type,
        value,
        onValueChange,
        required,
        validators,
        enabled,
        onRender,
        ...partialState
      } = params
      const validator = new FieldValidator({
        required,
        validators,
      })
      const firstValue = value ?? []
      const controller = new MultiSelectFieldController({
        state: {
          ...partialState,
          value: firstValue,
          validation: validator.validate(firstValue),
          touched: false,
          enabled: enabled ?? true,
          htmlElement: null,
        },
        validator,
      })
      if (onValueChange) {
        controller.valueChanges.subscribe(onValueChange)
      }
      if (onRender) {
        controller.renderChanges.subscribe(onRender)
      }
      return controller
    }

    const { type } = params
    throw new Error(`Unknown field type: ${type}`)
  }
}
