import {
  AbstractFieldController,
  AbstractFieldExternalParams,
  ControlType,
} from '../controllers/abstract-field'
import { FormController } from '../controllers/form'
import {
  CheckboxInputExternalParams,
  CheckboxInputController,
} from '../controllers/fields/input/checkbox'
import {
  DateInputExternalParams,
  DateInputController,
} from '../controllers/fields/input/date'
import {
  FileInputExternalParams,
  FileInputController,
} from '../controllers/fields/input/file'
import {
  NumberInputController,
  NumberInputExternalParams,
} from '../controllers/fields/input/number'
import {
  TextInputController,
  TextInputExternalParams,
} from '../controllers/fields/input/text/text'
import {
  RadiosController,
  RadiosExternalParams,
} from '../controllers/fields/select/radios'
import {
  SelectController,
  SelectExternalParams,
} from '../controllers/fields/select'
import {
  TextAreaController,
  TextAreaExternalParams,
} from '../controllers/fields/textarea'
import {
  TimeInputController,
  TimeInputExternalParams,
} from '../controllers/fields/input/time'
import {
  PasswordInputController,
  PasswordInputExternalParams,
} from '../controllers/fields/input/text/password'
import {
  CustomSelectController,
  CustomSelectExternalParams,
} from '../controllers/fields/select/custom-select'
import {
  MultipleSelectController,
  MultipleSelectExternalParams,
} from '../controllers/fields/multiple-select'

export function buildFieldController(
  params: AbstractFieldExternalParams<any, any>,
  form: FormController,
  name: string
): AbstractFieldController {
  switch (params.controlType) {
    case 'checkboxInput':
      return new CheckboxInputController({
        ...(params as CheckboxInputExternalParams),
        form,
        name,
      })
    case 'dateInput':
      return new DateInputController({
        ...(params as DateInputExternalParams),
        form,
        name,
      })
    case 'timeInput':
      return new TimeInputController({
        ...(params as TimeInputExternalParams),
        form,
        name,
      })
    case 'fileInput':
      return new FileInputController({
        ...(params as FileInputExternalParams),
        form,
        name,
      })
    case 'numberInput':
      return new NumberInputController({
        ...(params as NumberInputExternalParams),
        form,
        name,
      })
    case 'textInput':
      return new TextInputController({
        ...(params as TextInputExternalParams),
        form,
        name,
      })
    case 'passwordInput':
      return new PasswordInputController({
        ...(params as PasswordInputExternalParams),
        form,
        name,
      })
    case 'radios':
      return new RadiosController({
        ...(params as RadiosExternalParams<any>),
        form,
        name,
      })
    case 'select':
      return new SelectController({
        ...(params as SelectExternalParams<any>),
        form,
        name,
      })
    case 'customSelect':
      return new CustomSelectController({
        ...(params as CustomSelectExternalParams<any>),
        form,
        name,
      })
    case 'multipleSelect':
      return new MultipleSelectController({
        ...(params as MultipleSelectExternalParams<any>),
        form,
        name,
      })
    case 'textArea':
      return new TextAreaController({
        ...(params as TextAreaExternalParams),
        form,
        name,
      })
  }
}
