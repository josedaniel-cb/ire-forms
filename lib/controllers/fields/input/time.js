import { HtmlInput } from '../../../ui/html-input';
import { AbstractInputController, InputType, } from '../abstract-input';
export class TimeInputController extends AbstractInputController {
    constructor(params) {
        super({ ...params, type: InputType.Time });
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
        return element.value !== '' ? element.value : null;
    }
    _setValueToElement(value, element) {
        if (value !== null) {
            element.value = value;
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
function makeTimeInputExternalParams(params) {
    return { ...params, controlType: 'timeInput' };
}
export { makeTimeInputExternalParams };
//# sourceMappingURL=time.js.map