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
    static { this.config = FormConfig.set; }
    static build(params) {
        return FormController.build(params);
    }
    static { this.build2 = FormController.build2; }
    static { this.fieldset = (params) => params; }
    static { this.checkboxInput = makeCheckboxInputExternalParams; }
    static { this.dateInput = makeDateInputExternalParams; }
    static { this.timeInput = makeTimeInputExternalParams; }
    static { this.fileInput = makeFileInputExternalParams; }
    static { this.numberInput = makeNumberInputExternalParams; }
    static { this.textInput = makeTextInputExternalParams; }
    static { this.passwordInput = makePasswordInputExternalParams; }
    static { this.radios = makeRadiosExternalParams; }
    static { this.select = makeSelectExternalParams; }
    static { this.customSelect = makeCustomSelectExternalParams; }
    static { this.multipleSelect = makeMultipleSelectExternalParams; }
    static { this.textArea = makeTextAreaExternalParams; }
    static { this.iconButton = makeIconButtonArgs; }
    static { this.button = makeButtonArgs; }
}
//# sourceMappingURL=form-builder.js.map