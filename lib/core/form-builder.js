import { FormController } from '../controllers/form';
import { makeCheckboxInputExternalParams } from '../controllers/fields/input/checkbox';
import { makeDateInputExternalParams } from '../controllers/fields/input/date';
import { makeFileInputExternalParams } from '../controllers/fields/input/file';
import { makeNumberInputExternalParams } from '../controllers/fields/input/number';
import { makeTextInputExternalParams } from '../controllers/fields/input/text/text';
import { makeRadiosExternalParams } from '../controllers/fields/select/radios';
import { makeSelectExternalParams } from '../controllers/fields/select';
import { makeTextAreaExternalParams } from '../controllers/fields/textarea';
import { makeTimeInputExternalParams } from '../controllers/fields/input/time';
import { makePasswordInputExternalParams } from '../controllers/fields/input/text/password';
import { makeCustomSelectExternalParams } from '../controllers/fields/select/custom-select';
import { FormConfig } from './config';
import { makeButtonArgs, makeIconButtonArgs } from './buttons/form-button';
import '../ui/components/form';
import { makeMultipleSelectExternalParams } from '../controllers/fields/multiple-select';
export class FormBuilder {
    static config = FormConfig.set;
    static build(params) {
        return FormController.build(params);
    }
    static build2 = FormController.build2;
    static fieldset = (params) => params;
    static checkboxInput = makeCheckboxInputExternalParams;
    static dateInput = makeDateInputExternalParams;
    static timeInput = makeTimeInputExternalParams;
    static fileInput = makeFileInputExternalParams;
    static numberInput = makeNumberInputExternalParams;
    static textInput = makeTextInputExternalParams;
    static passwordInput = makePasswordInputExternalParams;
    static radios = makeRadiosExternalParams;
    static select = makeSelectExternalParams;
    static customSelect = makeCustomSelectExternalParams;
    static multipleSelect = makeMultipleSelectExternalParams;
    static textArea = makeTextAreaExternalParams;
    static iconButton = makeIconButtonArgs;
    static button = makeButtonArgs;
}
//# sourceMappingURL=form-builder.js.map