import { BehaviorSubject, takeUntil } from 'rxjs';
import { REQUIRED_OPTION_MESSAGE } from '../../validators/messages';
import { AbstractFieldController, } from '../abstract-field';
export class MultipleSelectController extends AbstractFieldController {
    // Options
    _optionsNotifier;
    // Value
    _emptyValue;
    _initialValue;
    // State
    _stateNotifier;
    constructor(params) {
        super(params);
        // Options
        const options = params.options.map((o) => ({
            value: o.value,
            template: o.template,
            textValue: o.textValue,
        }));
        this._optionsNotifier = new BehaviorSubject(options);
        // Value
        this._emptyValue = params.options.map(() => false);
        this._initialValue = params.options.map((o) => o.selected ?? false);
        // State
        const { invalidStateMessages, isValid } = this._validate(this._initialValue);
        this._stateNotifier = new BehaviorSubject({
            value: this._initialValue,
            touched: false,
            invalidStateMessages,
            isValid,
        });
        if (params.onStateChange !== undefined)
            this.stateChanges.subscribe(params.onStateChange);
        if (params.onValueChange !== undefined)
            this.valueChanges.subscribe(params.onValueChange);
        if (params.onValidityChange !== undefined)
            this.validityChanges.subscribe(params.onValidityChange);
    }
    // HTML
    connect(element) {
        super.connect(element);
        // Initialize value
        this._setValueToElement(this.value, element);
        // Manage validity
        element.addEventListener('focusout', () => {
            this.markAsTouched();
            this._stateNotifier.next(this.state);
        });
    }
    // Options
    get options() {
        return this._optionsNotifier.value;
    }
    get optionsChanges() {
        return this._optionsNotifier.pipe(takeUntil(this.form.unsubscribe));
    }
    async updateOptions(optionsArgs) {
        this._emptyValue = optionsArgs.map(() => false);
        this._initialValue = optionsArgs.map((o) => o.selected ?? false);
        const options = optionsArgs.map((o) => ({
            value: o.value,
            template: o.template,
            textValue: o.textValue,
        }));
        this._optionsNotifier.next(options);
        this._setValueToElement(this._initialValue, await this.elementAsync);
        this._validateAndNotify(this._initialValue);
    }
    // Value
    async setValue(value) {
        if (value.length !== this.options.length) {
            throw new Error('[ire-forms] Value length has to have the same length of options');
        }
        this._setValueToElement(value, await this.elementAsync);
        this._validateAndNotify(value);
    }
    // Validity
    _validate(value) {
        const isEmpty = () => value.length === 0;
        const checkValidity = () => {
            const invalidInputMessages = [];
            if (this.required && isEmpty())
                invalidInputMessages.push(REQUIRED_OPTION_MESSAGE);
            for (let validator of this._validators)
                if (!validator.validationFn(value))
                    invalidInputMessages.push(validator.message);
            return invalidInputMessages;
        };
        const invalidStateMessages = checkValidity();
        const isValid = invalidStateMessages.length === 0;
        return { invalidStateMessages, isValid };
    }
    _validateAndNotify(verifiedValue) {
        const { invalidStateMessages, isValid } = this._validate(verifiedValue);
        const { touched } = this.state;
        this._stateNotifier.next({
            value: verifiedValue,
            touched,
            invalidStateMessages,
            isValid,
        });
    }
    _setValueToElement(value, _) {
        this.handleSetValueToElement(value);
    }
    handleSetValueToElement(value) { }
    handleClear() { }
    // General
    reset() {
        super.reset();
        // this.value = this._initialValue
        this.setValue([...this._initialValue]);
        this.handleClear();
    }
    clean() {
        super.clean();
        // this.value = this._emptyValue
        this.setValue([...this._emptyValue]);
        this.handleClear();
    }
    get selectedValues() {
        // return this.options
        //   .map((o, i) => ({ option: o, index: i }))
        //   .filter(({ index }) => this.value[index])
        //   .map(({ option: { value } }) => value)
        return this.options
            .filter((_, i) => this.value[i])
            .map(({ value }) => value);
    }
    // Solidn't
    markAsUntouched = this._markAsUntouched;
    validateAndNotify = this._validateAndNotify;
}
export function makeMultipleSelectExternalParams(params) {
    return { ...params, controlType: 'multipleSelect' };
}
//# sourceMappingURL=multiple-select.js.map