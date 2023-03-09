import { BehaviorSubject, distinctUntilChanged, filter, firstValueFrom, map, takeUntil, } from 'rxjs';
import { Attributes } from '../core/attributes';
import { FormButtonSet, } from '../core/buttons/form-button-set';
export class AbstractFieldController {
    // Form controller reference
    form;
    // Buttons
    buttons;
    // Inmutable attributes
    name;
    // Inmutable attributes (wrapper)
    wrapperClasses;
    wrapperStyles;
    label;
    // Mutable attributes
    _attributes;
    // Validity
    _validators;
    // HTML
    _elementNotifier;
    // Next
    onFilled = () => { };
    constructor(params) {
        // Form
        this.form = params.form;
        // Inmutable attributes and properties
        this.name = params.name;
        this.wrapperClasses = params.classes;
        this.wrapperStyles = params.styles;
        this.label = params.label;
        // Mutable attribute
        this._attributes = new Attributes();
        this.required = params.required ?? true;
        this.disabled = params.disabled ?? false;
        // Validity
        this._validators = params.validators !== undefined ? params.validators : [];
        // HTML
        this._elementNotifier = new BehaviorSubject(null);
        if (params.onRender !== undefined)
            this.renderedElementChanges.subscribe((element) => params.onRender(element));
        // Buttons
        if (params.buttons) {
            this.buttons = FormButtonSet.build(params.buttons);
        }
    }
    // Mutable attributes
    get disabled() {
        return this._attributes.getBoolean('disabled');
    }
    set disabled(value) {
        this._attributes.setBoolean('disabled', value);
    }
    get required() {
        return this._attributes.getBoolean('required');
    }
    set required(value) {
        this._attributes.setBoolean('required', value);
    }
    // Value
    get value() {
        return this._stateNotifier.value.value;
    }
    set value(value) {
        this.setValue(value);
    }
    get valueChanges() {
        return this._stateNotifier.pipe(map((state) => state.value), 
        // distinct(),
        distinctUntilChanged(), takeUntil(this.form.unsubscribe));
    }
    // State
    get state() {
        return this._stateNotifier.value;
    }
    get stateChanges() {
        return this._stateNotifier.pipe(takeUntil(this.form.unsubscribe));
    }
    // Validity
    get isValid() {
        return this._stateNotifier.value.isValid;
    }
    get validity() {
        return {
            isValid: this.isValid,
            invalidStateMessages: this.invalidStateMessages,
        };
    }
    get validityChanges() {
        return this._stateNotifier.pipe(map((state) => {
            return {
                isValid: state.isValid,
                invalidStateMessages: this.invalidStateMessages,
            };
        }), 
        // distinct(({ invalidStateMessages }) => invalidStateMessages),
        distinctUntilChanged((prev, curr) => prev.invalidStateMessages === curr.invalidStateMessages), takeUntil(this.form.unsubscribe));
    }
    get invalidStateMessages() {
        return this._stateNotifier.value.invalidStateMessages;
    }
    get touched() {
        return this._stateNotifier.value.touched;
    }
    markAsTouched() {
        this._stateNotifier.next({
            ...this.state,
            touched: true,
        });
    }
    async _markAsUntouched() {
        // TODO: TEST REQUIRED
        await this.blur();
        this._stateNotifier.next({
            ...this.state,
            touched: false,
        });
    }
    // HTML
    get element() {
        return this._elementNotifier.value;
    }
    get elementChanges() {
        return this._elementNotifier.pipe(takeUntil(this.form.unsubscribe));
    }
    get renderedElementChanges() {
        return this.elementChanges.pipe(filter((value) => value !== null), map((value) => value), distinctUntilChanged(), takeUntil(this.form.unsubscribe));
    }
    get elementAsync() {
        return firstValueFrom(this.renderedElementChanges);
    }
    connect(element) {
        // Set attributes
        Object.keys(this._attributes.value).forEach((name) => {
            const value = this._attributes.value[name];
            element.setAttribute(name, value);
        });
        // Subscribe to attributes changes
        this._attributes.changes.subscribe((changesList) => changesList.forEach((change) => {
            if (change.value !== undefined)
                element.setAttribute(change.name, change.value);
            else
                element.removeAttribute(change.name);
        }));
        this._elementNotifier.next(element);
    }
    disconnect() {
        this._elementNotifier.next(null);
    }
    async focus() {
        ;
        (await this.elementAsync).focus();
    }
    async blur() {
        ;
        (await this.elementAsync).blur();
    }
    // General
    reset() {
        this._markAsUntouched();
    }
    clean() {
        this._markAsUntouched();
    }
    dispose() {
        this.form.unsubscribe.next();
        this.form.unsubscribe.complete();
        this._attributes.dispose();
    }
}
//# sourceMappingURL=abstract-field.js.map