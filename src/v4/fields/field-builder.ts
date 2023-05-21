import { FormDefinitionLeaf } from '../form/form-definition'
import { FieldController } from './field-controller'
import {
  MultiSelectFieldController,
  MultiSelectFieldValidator,
} from './multiple-select-field/controller'
import {
  SelectFieldController,
  SelectFieldValidator,
} from './select-field/controller'
import {
  TextFieldController,
  TextFieldValidator,
} from './text-field/controller'

export class FieldBuilder {
  static build(params: FormDefinitionLeaf): FieldController<any, any, any> {
    let controller: FieldController<any, any, any> | undefined = undefined

    if (params.type === 'text') {
      const validator = new TextFieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const nonValidatedValueState = {
        value: params.value ?? '',
        enabled: params.enabled ?? true,
      }
      controller = new TextFieldController({
        valueState: {
          ...nonValidatedValueState,
          validationResult: validator.validate(nonValidatedValueState),
        },
        uiState: {
          touched: false,
          htmlElement: null,
          label: params.label,
          placeholder: params.placeholder ?? null,
        },
        validator,
      })
    }

    if (params.type === 'select') {
      const validator = new SelectFieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const nonValidatedValueState = {
        value: params.value ?? null,
        enabled: params.enabled ?? true,
        options: params.options,
      }
      controller = new SelectFieldController({
        valueState: {
          ...nonValidatedValueState,
          validationResult: validator.validate(nonValidatedValueState),
        },
        uiState: {
          touched: false,
          htmlElement: null,
          label: params.label,
        },
        validator,
      })
    }

    if (params.type === 'multi-select') {
      const validator = new MultiSelectFieldValidator({
        required: params.required,
        validators: params.validators,
      })
      const nonValidatedValueState = {
        value: params.value ?? [],
        enabled: params.enabled ?? true,
        options: params.options,
      }
      controller = new MultiSelectFieldController({
        valueState: {
          ...nonValidatedValueState,
          validationResult: validator.validate(nonValidatedValueState),
        },
        uiState: {
          touched: false,
          htmlElement: null,
          label: params.label,
        },
        validator,
      })
    }

    if (controller) {
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
