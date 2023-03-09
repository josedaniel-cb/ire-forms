import { InputType } from '../../abstract-input';
import { AbstractTextInputController, } from '../abstract-text';
export class TextInputController extends AbstractTextInputController {
    upperCaseOnly;
    constructor(params) {
        super({ ...params, type: InputType.Text });
        this.upperCaseOnly = params.upperCaseOnly ?? false;
    }
}
function makeTextInputExternalParams(params) {
    return { ...params, controlType: 'textInput' };
}
export { makeTextInputExternalParams };
//# sourceMappingURL=text.js.map