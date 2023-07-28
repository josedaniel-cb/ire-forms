import { FormDefinitionLeaf } from '../form/form-definition'
import { FieldController } from './field-controller'
import { FieldUIState } from './field-ui-state'
import { FieldValueState } from './field-value-state'
import { MultiSelectFieldController } from './multiple-select-field/controller'
import { MultiSelectFieldValidator } from './multiple-select-field/validator'
import { SelectFieldController } from './select-field/controller'
import { SelectFieldValidator } from './select-field/validator'
import { TextFieldController } from './text-field/controller'
import { TextFieldValidator } from './text-field/validator'
import { Subject } from 'rxjs'

type GenericFieldController = FieldController<
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  any,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  FieldValueState<any>,
  FieldUIState
>

export class FieldBuilder {
  static build(
    params: FormDefinitionLeaf,
    unsubscribeSubject: Subject<void>,
  ): GenericFieldController {
    // rome-ignore lint/suspicious/noExplicitAny: any is required here
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
        unsubscribeSubject,
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
        unsubscribeSubject,
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
        unsubscribeSubject,
      })
    }

    if (controller === undefined) {
      const { type } = params
      throw new Error(`Unknown field type: ${type}`)
    }

    const c = controller
    const {
      onValueStateChange,
      onValueChange,
      onValidation,
      onUiStateChange,
      onRender,
    } = params
    // Subscriptions
    if (onValueStateChange !== undefined)
      c.valueStateChanges.subscribe((valueState) =>
        onValueStateChange(valueState, c),
      )
    if (onValueChange !== undefined)
      c.valueChanges.subscribe((value) => onValueChange(value, c))
    if (onValidation !== undefined)
      c.validationChanges.subscribe((validation) => onValidation(validation, c))
    if (onUiStateChange !== undefined)
      c.uiStateChanges.subscribe((uiState) => onUiStateChange(uiState, c))
    if (onRender !== undefined)
      c.renderChanges.subscribe((el) => onRender(el, c))

    return c
  }
}
