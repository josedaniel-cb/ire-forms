import { Icon } from './components/icons/icon'
import { IreCheckboxesElement } from './components/stateful/checkboxes-element'
import { IreChipsElement } from './components/stateful/chips-element'
import './components/stateful/form-element'
import { IreNativeSelectElement } from './components/stateful/native-select-element'
import { IreRadiosElement } from './components/stateful/radios-element'
import { IreTextElement } from './components/stateful/text-element'
import { CheckboxesField } from './fields/controllers/checkboxes-controller'
import { ChipsField } from './fields/controllers/chips-controller'
import { NativeSelectField } from './fields/controllers/native-select-controller'
import { RadiosField } from './fields/controllers/radios-controller'
import { TextField } from './fields/controllers/text-controller'
import { FormUILayouts } from './form-ui/form-ui-layout'
import { FormBuilder } from './form/builder/form-builder'
import { Form } from './form/controller/form-controller'
import { html } from 'lit'

export {
  Form,
  // Form2,
  FormBuilder,
  // Validators,
  // Layouts
  IreTextElement,
  IreNativeSelectElement as IreSelectElement,
  IreChipsElement,
  IreCheckboxesElement,
  IreRadiosElement,
  // new
  html,
  Icon,
  FormUILayouts,
}
export type {
  //   AbstractField,
  //   AbstractInput,
  //   CheckboxInput,
  //   DateInput,
  //   TimeInput,
  //   FileInput,
  //   NumberInput,
  //   AbstractTextInput,
  //   TextInput,
  //   PasswordInput,
  //   AbstractSelect,
  //   Radios,
  //   Select,
  //   CustomSelect,
  //   TextArea,
  TextField,
  NativeSelectField as SelectField,
  ChipsField,
  CheckboxesField,
  RadiosField,
}
