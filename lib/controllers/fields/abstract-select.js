import { BehaviorSubject, takeUntil } from 'rxjs';
import { REQUIRED_OPTION_MESSAGE } from '../../validators/messages';
import { AbstractFieldController, } from '../abstract-field';
export class AbstractSelectController extends AbstractFieldController {
    // Options
    _optionsNotifier;
    // Index
    _defaultIndex = -1;
    _initialIndex; // -1 or [0, n>
    _indexNotifier; // -1 or [0, n>
    // State
    _stateNotifier;
    constructor(params) {
        super(params);
        // Options
        this._optionsNotifier = new BehaviorSubject(params.options);
        // Index
        this._initialIndex = this._checkIndex(params.index);
        this._indexNotifier = new BehaviorSubject(this._initialIndex);
        if (params.onIndexChange !== undefined)
            this.indexChanges.subscribe(params.onIndexChange);
        // State
        const validity = this._validate(this.index);
        this._stateNotifier = new BehaviorSubject({
            value: this.getValueFromIndex(this.index),
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
    // HTML
    connect(element) {
        super.connect(element);
        // Initialize value
        this._setIndexToElement(this.index, element);
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
    updateOptions(params) {
        this.clean();
        this._optionsNotifier.next(params.options);
        this._initialIndex = this._checkIndex(params.index);
        this.index = this._initialIndex;
    }
    // Index
    get index() {
        return this._indexNotifier.value;
    }
    set index(i) {
        this.setIndex(i);
    }
    get indexChanges() {
        return this._indexNotifier.pipe(takeUntil(this.form.unsubscribe));
    }
    _checkIndex(index) {
        if (index === undefined) {
            return this._defaultIndex;
        }
        if (index < 0 || index >= this.options.length) {
            index = this._defaultIndex;
        }
        return index;
    }
    async setIndex(index) {
        index = this._checkIndex(index);
        this._setIndexToElement(index, await this.elementAsync);
        this._validateAndNotify(index);
    }
    getValueFromIndex(index) {
        return index !== this._defaultIndex ? this.options[this.index].value : null;
    }
    get isEmpty() {
        return this.index === this._defaultIndex;
    }
    // Value
    async setValue(value) {
        let i = this._defaultIndex;
        if (value !== null) {
            i = this.options.findIndex((option) => option.value === value);
        }
        await this.setIndex(i);
    }
    // Validity
    _validate(index) {
        const isEmpty = (i) => i === this._defaultIndex;
        const checkValidity = (i) => {
            const invalidInputMessages = [];
            if (this.required && isEmpty(i))
                invalidInputMessages.push(REQUIRED_OPTION_MESSAGE);
            const value = this.getValueFromIndex(index);
            for (let i = 0; i < this._validators.length; i++)
                if (!this._validators[i].validationFn(value))
                    invalidInputMessages.push(this._validators[i].message);
            return invalidInputMessages;
        };
        const invalidStateMessages = checkValidity(index);
        return {
            invalidStateMessages,
            isValid: invalidStateMessages.length === 0,
        };
    }
    _validateAndNotify(index) {
        this._indexNotifier.next(index);
        const validity = this._validate(index);
        this._stateNotifier.next({
            ...this.state,
            value: this.getValueFromIndex(index),
            ...validity,
        });
    }
    // General
    reset() {
        super.reset();
        this.index = this._initialIndex;
    }
    clean() {
        super.clean();
        this.index = this._defaultIndex;
    }
}
//# sourceMappingURL=abstract-select.js.map