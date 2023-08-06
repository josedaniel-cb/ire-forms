import { IreCheckboxesElement } from './components/stateful/checkboxes-element'
import { IreChipsElement } from './components/stateful/chips-element'
import './components/stateful/form-element'
import { IreInputElement } from './components/stateful/input-element'
import { IreSelectElement } from './components/stateful/select-element'
import { CheckboxesField } from './fields/controllers/checkboxes-controller'
import { ChipsField } from './fields/controllers/chips-controller'
import { SelectField } from './fields/controllers/native-select-controller'
import { TextField } from './fields/controllers/text-controller'
import { FormBuilder } from './form/builder/form-builder'
import { Form } from './form/controller/form-controller'

export {
  Form,
  // Form2,
  FormBuilder,
  // Validators,
  // Layouts
  IreInputElement,
  IreSelectElement,
  IreChipsElement,
  IreCheckboxesElement,
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
  SelectField,
  ChipsField,
  CheckboxesField,
}
