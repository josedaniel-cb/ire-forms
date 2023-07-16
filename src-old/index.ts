import { FormBuilder } from './core/form-builder'
import { Layouts } from './ui/styles/layouts'
import { Validators } from './validators/validators'
import { Form, Form2 } from './controllers/form'
import { CheckboxInput } from './controllers/fields/input/checkbox'
import { DateInput } from './controllers/fields/input/date'
import { TimeInput } from './controllers/fields/input/time'
import { FileInput } from './controllers/fields/input/file'
import { NumberInput } from './controllers/fields/input/number'
import { TextInput } from './controllers/fields/input/text/text'
import { PasswordInput } from './controllers/fields/input/text/password'
import { Radios } from './controllers/fields/select/radios'
import { Select } from './controllers/fields/select'
import { TextArea } from './controllers/fields/textarea'
import { AbstractInput } from './controllers/fields/abstract-input'
import { AbstractTextInput } from './controllers/fields/input/abstract-text'
import { AbstractSelect } from './controllers/fields/abstract-select'
import { AbstractField } from './controllers/abstract-field'
import { CustomSelect } from './controllers/fields/select/custom-select'
// import './ui/components/form'; // TODO: side efects only! look for right place
export { Form, Form2, FormBuilder, Validators, Layouts }
export type {
  AbstractField,
  AbstractInput,
  CheckboxInput,
  DateInput,
  TimeInput,
  FileInput,
  NumberInput,
  AbstractTextInput,
  TextInput,
  PasswordInput,
  AbstractSelect,
  Radios,
  Select,
  CustomSelect,
  TextArea,
}
