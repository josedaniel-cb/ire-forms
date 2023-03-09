import { HtmlInput } from '../../../ui/html-input';
import { AbstractInputController, InputType, } from '../abstract-input';
export class CheckboxInputController extends AbstractInputController {
    constructor(params) {
        super({
            ...params,
            required: params.required !== undefined ? params.required : false,
            type: InputType.Checkbox,
        });
    }
    connect(element) {
        super.connect(element);
        HtmlInput.addEnterKeyListener(element, this.onFilled);
        element.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                this.setValue(!this.value);
            }
        });
    }
    _isEmpty(value) {
        return !value;
    }
    _getValueFromElement(element) {
        return element.checked;
    }
    _setValueToElement(value, element) {
        element.checked = value;
    }
    _getDefaultValue() {
        return false;
    }
}
function makeCheckboxInputExternalParams(params) {
    return { ...params, controlType: 'checkboxInput' };
}
export { makeCheckboxInputExternalParams };
//# sourceMappingURL=checkbox.js.map