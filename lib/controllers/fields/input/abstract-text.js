import { HtmlInput } from '../../../ui/html-input';
import { AbstractInputController, } from '../abstract-input';
export class AbstractTextInputController extends AbstractInputController {
    // readonly upperCaseOnly: boolean;
    constructor(params) {
        super(params);
        if (params.maxlength !== undefined) {
            this.maxlength = params.maxlength;
        }
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
    }
    connect(element) {
        super.connect(element);
        HtmlInput.addEnterKeyListener(element, this.onFilled);
    }
    _getValueFromElement(element) {
        return element.value;
    }
    _setValueToElement(value, element) {
        element.value = value;
    }
    _getDefaultValue() {
        return '';
    }
    get placeholder() {
        return this._attributes.get('placeholder');
    }
    set placeholder(value) {
        this._attributes.set('placeholder', value);
    }
    get maxlength() {
        return this._attributes.getNumber('maxlength');
    }
    set maxlength(value) {
        this._attributes.setNumber('maxlength', value);
    }
}
//# sourceMappingURL=abstract-text.js.map