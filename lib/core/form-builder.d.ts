import { FieldSetExternalParams } from './field-set';
import { Form, FormController, FormParams } from '../controllers/form';
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
import { FormConfig } from './config';
import '../ui/components/form';
import { makeMultipleSelectExternalParams } from '../controllers/fields/multiple-select';
export declare class FormBuilder {
    static config: typeof FormConfig.set;
    static build(params: FormParams): Form;
    static build2: typeof FormController.build2;
    static readonly fieldset: (params: FieldSetExternalParams) => FieldSetExternalParams;
    static readonly checkboxInput: typeof makeCheckboxInputExternalParams;
    static readonly dateInput: typeof makeDateInputExternalParams;
    static readonly timeInput: typeof makeTimeInputExternalParams;
    static readonly fileInput: typeof makeFileInputExternalParams;
    static readonly numberInput: typeof makeNumberInputExternalParams;
    static readonly textInput: typeof makeTextInputExternalParams;
    static readonly passwordInput: typeof makePasswordInputExternalParams;
    static readonly radios: typeof makeRadiosExternalParams;
    static readonly select: typeof makeSelectExternalParams;
    static readonly customSelect: <T>(params: import("../controllers/fields/select/custom-select").CustomSelectBuilderParams<T>) => import("../controllers/fields/select/custom-select").CustomSelectExternalParams<T>;
    static readonly multipleSelect: typeof makeMultipleSelectExternalParams;
    static readonly textArea: typeof makeTextAreaExternalParams;
    static readonly iconButton: (args: import("./buttons/form-button").FormButtonExternalArgs) => import("./buttons/form-button").FormButtonArgs;
    static readonly button: (args: import("./buttons/form-button").FormButtonExternalArgs) => import("./buttons/form-button").FormButtonArgs;
}
//# sourceMappingURL=form-builder.d.ts.map