import { BehaviorSubject } from 'rxjs';
import { REQUIRED_FIELD_MESSAGE } from '../../validators/messages';
import { AbstractFieldController, } from '../abstract-field';
export class TextAreaController extends AbstractFieldController {
    // Value
    _defaultValue = '';
    _initialValue;
    // State
    _stateNotifier;
    constructor(params) {
        super(params);
        // Value
        this._initialValue =
            params.value !== undefined ? params.value : this._defaultValue;
        const validity = this._validate(this._initialValue);
        this._stateNotifier = new BehaviorSubject({
            value: this._initialValue,
            ...validity,
            touched: false,
        });
        if (params.onStateChange !== undefined)
            this.stateChanges.subscribe(params.onStateChange);
        if (params.onValueChange !== undefined)
            this.valueChanges.subscribe(params.onValueChange);
        if (params.onValidityChange !== undefined)
            this.validityChanges.subscribe(params.onValidityChange);
        // Mutable attributes
        if (params.cols !== undefined)
            this.cols = params.cols;
        if (params.rows !== undefined)
            this.rows = params.rows;
        if (params.minlength !== undefined)
            this.minlength = params.minlength;
        if (params.maxlength !== undefined)
            this.maxlength = params.maxlength;
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
        if (params.spellcheck !== undefined)
            this.spellcheck = params.spellcheck;
        if (params.wrap !== undefined)
            this.wrap = params.wrap;
    }
    // Html
    connect(element) {
        super.connect(element);
        // Initialize value
        this._setValueToElement(this.value, element);
        // Subscribe to user changes
        element.addEventListener('input', () => {
            const value = this._getValueFromElement(element);
            this._validateAndNotify(value);
        });
        // Manage validity
        element.addEventListener('focusout', () => {
            this.markAsTouched();
            this._stateNotifier.next(this.state);
        });
    }
    _getValueFromElement(element) {
        return element.value;
    }
    _setValueToElement(value, element) {
        element.value = value;
    }
    // Value
    async setValue(value) {
        this._setValueToElement(value, await this.elementAsync);
        this._validateAndNotify(value);
    }
    // Validity
    _validate(value) {
        const isEmpty = (value) => value === this._defaultValue;
        const checkValidity = (value) => {
            const invalidInputMessages = [];
            if (this.required && isEmpty(value))
                invalidInputMessages.push(REQUIRED_FIELD_MESSAGE);
            for (let i = 0; i < this._validators.length; i++)
                if (!this._validators[i].validationFn(value))
                    invalidInputMessages.push(this._validators[i].message);
            return invalidInputMessages;
        };
        const invalidStateMessages = checkValidity(value);
        return {
            invalidStateMessages,
            isValid: invalidStateMessages.length === 0,
        };
    }
    _validateAndNotify(value) {
        const validity = this._validate(value);
        this._stateNotifier.next({
            ...this.state,
            ...validity,
            value,
        });
    }
    // General
    reset() {
        super.reset();
        this.value = this._initialValue;
    }
    clean() {
        super.clean();
        this.value = this._defaultValue;
    }
    // Mutable attributes
    get cols() {
        return this._attributes.getNumber('cols');
    }
    set cols(value) {
        this._attributes.setNumber('cols', value);
    }
    get rows() {
        return this._attributes.getNumber('rows');
    }
    set rows(value) {
        this._attributes.setNumber('rows', value);
    }
    get minlength() {
        return this._attributes.getNumber('minlength');
    }
    set minlength(value) {
        this._attributes.setNumber('minlength', value);
    }
    get maxlength() {
        return this._attributes.getNumber('maxlength');
    }
    set maxlength(value) {
        this._attributes.setNumber('maxlength', value);
    }
    get placeholder() {
        return this._attributes.get('placeholder');
    }
    set placeholder(value) {
        this._attributes.set('placeholder', value);
    }
    get spellcheck() {
        return this._attributes.get('spellcheck');
    }
    set spellcheck(value) {
        this._attributes.set('spellcheck', value);
    }
    get wrap() {
        return this._attributes.get('wrap');
    }
    set wrap(value) {
        this._attributes.set('wrap', value);
    }
}
function makeTextAreaExternalParams(params) {
    return { ...params, controlType: 'textArea' };
}
export { makeTextAreaExternalParams };
//# sourceMappingURL=textarea.js.map