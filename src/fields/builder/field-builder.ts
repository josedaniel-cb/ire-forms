import { FormDefinitionLeaf } from '../../form/definition/form-definition'
import { FieldController } from '../controllers/field-controller'
import {
  MultiSelectFieldController,
  MultiSelectFieldValueState,
} from '../controllers/multi-select-controller'
import {
  SelectFieldController,
  SelectFieldValueState,
} from '../controllers/select-controller'
import { TextFieldController } from '../controllers/text-controller'
import { FieldUIState } from '../states/field-ui-state'
import { FieldValueState } from '../states/field-value-state'
import { MultiSelectFieldValidator } from '../validators/multi-select-validator'
import { SelectFieldValidator } from '../validators/select-validator'
import { TextFieldValidator } from '../validators/text-validator'
import { Subject } from 'rxjs'

type GenericFieldController = FieldController<
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  any,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  FieldValueState<any>,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  any,
  // rome-ignore lint/suspicious/noExplicitAny: any is required here
  FieldUIState<any>
>

export class FieldBuilder {
  static build(
    params: FormDefinitionLeaf,
    unsubscribeSubject: Subject<void>,
  ): GenericFieldController {
    // rome-ignore lint/suspicious/noExplicitAny: any is required here
    let controller: FieldController<any, any, any, any> | undefined = undefined

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
        index: params.index ?? null,
        enabled: params.enabled ?? true,
        options: params.options,
      }
      controller = new SelectFieldController({
        valueState: new SelectFieldValueState(
          nonValidatedValueState,
          validator,
        ),
        uiState: {
          touched: false,
          htmlElement: null,
          placeholder: params.placeholder ?? null,
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
        indexes: params.indexes ?? [],
      }
      controller = new MultiSelectFieldController({
        valueState: new MultiSelectFieldValueState(
          nonValidatedValueState,
          validator,
        ),
        uiState: {
          touched: false,
          htmlElement: null,
          label: params.label,
          optionHtmlTemplateBuilder: params.optionHtmlTemplateBuilder,
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
