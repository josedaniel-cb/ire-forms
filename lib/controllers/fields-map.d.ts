import { TextInput, TextInputExternalParams } from './fields/input/text/text';
import { NumberInput, NumberInputExternalParams } from './fields/input/number';
import { CheckboxInput, CheckboxInputExternalParams } from './fields/input/checkbox';
import { FileInput, FileInputExternalParams } from './fields/input/file';
import { PasswordInput, PasswordInputExternalParams } from './fields/input/text/password';
import { DateInput, DateInputExternalParams } from './fields/input/date';
import { TimeInput, TimeInputExternalParams } from './fields/input/time';
import { Select, SelectExternalParams } from './fields/select';
import { CustomSelect, CustomSelectExternalParams } from './fields/select/custom-select';
import { Radios, RadiosExternalParams } from './fields/select/radios';
import { MultipleSelect, MultipleSelectExternalParams } from './fields/multiple-select';
import { TextArea, TextAreaExternalParams } from './fields/textarea';
export interface FieldInterfacesMap {
    textInput: TextInput;
    numberInput: NumberInput;
    checkboxInput: CheckboxInput;
    fileInput: FileInput;
    passwordInput: PasswordInput;
    dateInput: DateInput;
    timeInput: TimeInput;
    select: Select;
    customSelect: CustomSelect;
    radios: Radios;
    multipleSelect: MultipleSelect<any>;
    textArea: TextArea;
}
export type FieldArgs<T = any> = TextInputExternalParams | NumberInputExternalParams | CheckboxInputExternalParams | FileInputExternalParams | PasswordInputExternalParams | DateInputExternalParams | TimeInputExternalParams | SelectExternalParams<T> | CustomSelectExternalParams<T> | RadiosExternalParams<T> | MultipleSelectExternalParams<T> | TextAreaExternalParams;
//# sourceMappingURL=fields-map.d.ts.map