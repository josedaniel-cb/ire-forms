import { HtmlInput } from '../../../ui/html-input';
import { AbstractInputController, InputType, } from '../abstract-input';
export class DateInputController extends AbstractInputController {
    constructor(params) {
        super({ ...params, type: InputType.Date });
        if (params.min !== undefined)
            this.min = params.min;
        if (params.max !== undefined)
            this.max = params.max;
        if (params.step !== undefined)
            this.step = params.step;
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
    }
    // Html
    connect(element) {
        super.connect(element);
        element.addEventListener('focus', () => element.showPicker());
        HtmlInput.addEnterKeyListener(element, this.onFilled);
    }
    _getValueFromElement(element) {
        return element.valueAsDate;
    }
    _setValueToElement(value, element) {
        if (value !== null) {
            element.value = value.toISOString().substring(0, 10);
        }
        else {
            element.value = '';
        }
    }
    _getDefaultValue() {
        return null;
    }
    get placeholder() {
        return this._attributes.get('placeholder');
    }
    set placeholder(value) {
        this._attributes.set('placeholder', value);
    }
    get min() {
        return this._attributes.get('min');
    }
    set min(value) {
        this._attributes.set('min', value);
    }
    get max() {
        return this._attributes.get('max');
    }
    set max(value) {
        this._attributes.set('max', value);
    }
    get step() {
        return this._attributes.getNumber('step');
    }
    set step(value) {
        this._attributes.setNumber('step', value);
    }
}
function makeDateInputExternalParams(params) {
    return { ...params, controlType: 'dateInput' };
}
export { makeDateInputExternalParams };
//# sourceMappingURL=date.js.map