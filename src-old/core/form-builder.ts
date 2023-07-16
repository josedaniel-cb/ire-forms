import { FieldSetExternalParams } from './field-set'
import { Form, FormController, FormParams } from '../controllers/form'
import { makeCheckboxInputExternalParams } from '../controllers/fields/input/checkbox'
import { makeDateInputExternalParams } from '../controllers/fields/input/date'
import { makeFileInputExternalParams } from '../controllers/fields/input/file'
import { makeNumberInputExternalParams } from '../controllers/fields/input/number'
import { makeTextInputExternalParams } from '../controllers/fields/input/text/text'
import { makeRadiosExternalParams } from '../controllers/fields/select/radios'
import { makeSelectExternalParams } from '../controllers/fields/select'
import { makeTextAreaExternalParams } from '../controllers/fields/textarea'
import { makeTimeInputExternalParams } from '../controllers/fields/input/time'
import { makePasswordInputExternalParams } from '../controllers/fields/input/text/password'
import { makeCustomSelectExternalParams } from '../controllers/fields/select/custom-select'
import { FormConfig } from './config'
import { makeButtonArgs, makeIconButtonArgs } from './buttons/form-button'
import '../ui/components/form'
import { makeMultipleSelectExternalParams } from '../controllers/fields/multiple-select'

export class FormBuilder {
  static config = FormConfig.set

  static build(params: FormParams) {
    return FormController.build(params) as Form
  }

  static build2 = FormController.build2

  static readonly fieldset = (params: FieldSetExternalParams) => params

  static readonly checkboxInput = makeCheckboxInputExternalParams

  static readonly dateInput = makeDateInputExternalParams

  static readonly timeInput = makeTimeInputExternalParams

  static readonly fileInput = makeFileInputExternalParams

  static readonly numberInput = makeNumberInputExternalParams

  static readonly textInput = makeTextInputExternalParams

  static readonly passwordInput = makePasswordInputExternalParams

  static readonly radios = makeRadiosExternalParams

  static readonly select = makeSelectExternalParams

  static readonly customSelect = makeCustomSelectExternalParams

  static readonly multipleSelect = makeMultipleSelectExternalParams

  static readonly textArea = makeTextAreaExternalParams

  static readonly iconButton = makeIconButtonArgs

  static readonly button = makeButtonArgs
}
