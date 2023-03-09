import { BehaviorSubject } from 'rxjs';
import { REQUIRED_FIELD_MESSAGE } from '../../validators/messages';
import { AbstractFieldController, } from '../abstract-field';
export class AbstractInputController extends AbstractFieldController {
    // Inmutable attributes
    type;
    // Value
    _defaultValue;
    _initialValue;
    // State
    _stateNotifier;
    constructor(params) {
        super(params);
        // Inmutable attributes
        this.type = params.type;
        // Value
        this._defaultValue = this._getDefaultValue();
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
        });
    }
    // Value
    async setValue(value) {
        this._setValueToElement(value, await this.elementAsync);
        this._validateAndNotify(value);
    }
    _isEmpty(value) {
        return value === this._defaultValue;
    }
    // Validity
    _validate(value) {
        // const isEmpty = (value: T): boolean => value === this._defaultValue;
        const checkValidity = (value) => {
            const invalidInputMessages = [];
            const isEmpty = this._isEmpty(value);
            if (this.required && isEmpty)
                invalidInputMessages.push(REQUIRED_FIELD_MESSAGE);
            else
                return [];
            for (let i = 0; i < this._validators.length; i++) {
                const validator = this._validators[i];
                if (!validator.validationFn(value)) {
                    invalidInputMessages.push(validator.message);
                }
            }
            return invalidInputMessages;
        };
        const invalidStateMessages = checkValidity(value);
        const isValid = invalidStateMessages.length === 0;
        return { invalidStateMessages, isValid };
    }
    _validateAndNotify(value) {
        const validity = this._validate(value);
        this._stateNotifier.next({
            ...this.state,
            value,
            ...validity,
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
}
export var InputType;
(function (InputType) {
    InputType["Button"] = "button";
    InputType["Checkbox"] = "checkbox";
    InputType["Color"] = "color";
    InputType["Date"] = "date";
    InputType["DatetimeLocal"] = "datetime-local";
    InputType["Email"] = "email";
    InputType["File"] = "file";
    InputType["Hidden"] = "hidden";
    InputType["Image"] = "image";
    InputType["Month"] = "month";
    InputType["Number"] = "number";
    InputType["Password"] = "password";
    InputType["Radio"] = "radio";
    InputType["Range"] = "range";
    InputType["Reset"] = "reset";
    InputType["Search"] = "search";
    InputType["Submit"] = "submit";
    InputType["Tel"] = "tel";
    InputType["Text"] = "text";
    InputType["Time"] = "time";
    InputType["Url"] = "url";
    InputType["Week"] = "week";
})(InputType || (InputType = {}));
//# sourceMappingURL=abstract-input.js.map