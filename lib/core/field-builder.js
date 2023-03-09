import { CheckboxInputController, } from '../controllers/fields/input/checkbox';
import { DateInputController, } from '../controllers/fields/input/date';
import { FileInputController, } from '../controllers/fields/input/file';
import { NumberInputController, } from '../controllers/fields/input/number';
import { TextInputController, } from '../controllers/fields/input/text/text';
import { RadiosController, } from '../controllers/fields/select/radios';
import { SelectController, } from '../controllers/fields/select';
import { TextAreaController, } from '../controllers/fields/textarea';
import { TimeInputController, } from '../controllers/fields/input/time';
import { PasswordInputController, } from '../controllers/fields/input/text/password';
import { CustomSelectController, } from '../controllers/fields/select/custom-select';
import { MultipleSelectController, } from '../controllers/fields/multiple-select';
export function buildFieldController(params, form, name) {
    switch (params.controlType) {
        case 'checkboxInput':
            return new CheckboxInputController({
                ...params,
                form,
                name,
            });
        case 'dateInput':
            return new DateInputController({
                ...params,
                form,
                name,
            });
        case 'timeInput':
            return new TimeInputController({
                ...params,
                form,
                name,
            });
        case 'fileInput':
            return new FileInputController({
                ...params,
                form,
                name,
            });
        case 'numberInput':
            return new NumberInputController({
                ...params,
                form,
                name,
            });
        case 'textInput':
            return new TextInputController({
                ...params,
                form,
                name,
            });
        case 'passwordInput':
            return new PasswordInputController({
                ...params,
                form,
                name,
            });
        case 'radios':
            return new RadiosController({
                ...params,
                form,
                name,
            });
        case 'select':
            return new SelectController({
                ...params,
                form,
                name,
            });
        case 'customSelect':
            return new CustomSelectController({
                ...params,
                form,
                name,
            });
        case 'multipleSelect':
            return new MultipleSelectController({
                ...params,
                form,
                name,
            });
        case 'textArea':
            return new TextAreaController({
                ...params,
                form,
                name,
            });
    }
}
//# sourceMappingURL=field-builder.js.map