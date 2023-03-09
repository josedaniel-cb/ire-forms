import { InputType } from '../../abstract-input';
import { AbstractTextInputController, } from '../abstract-text';
export class PasswordInputController extends AbstractTextInputController {
    constructor(params) {
        super({ ...params, type: InputType.Password });
    }
}
function makePasswordInputExternalParams(params) {
    return { ...params, controlType: 'passwordInput' };
}
export { makePasswordInputExternalParams };
//# sourceMappingURL=password.js.map