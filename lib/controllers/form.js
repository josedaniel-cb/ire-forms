import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { FieldSet } from '../core/field-set';
export class FormController {
    static build(params) {
        const form = new FormController();
        const tree = new FieldSet({ ...params, form });
        form._setFields(tree);
        if (params.onStateChange !== undefined)
            form.stateChanges.subscribe(params.onStateChange);
        if (params.onValueChange !== undefined)
            form.valueChanges.subscribe(params.onValueChange);
        if (params.onValidityChange !== undefined)
            form.validityChanges.subscribe(params.onValidityChange);
        return form;
    }
    static build2(params) {
        const form = FormController.build(params);
        const proxy = new Proxy(form, {
            get: (target, key) => {
                if (key in target) {
                    return target[key];
                }
                if (key === 'fields') {
                    return form._map;
                }
                return undefined;
            },
        });
        return proxy;
    }
    constructor() {
        // Subscriptions
        this.unsubscribe = new Subject();
    }
    _setFields(tree) {
        // Fields
        this._tree = tree;
        this._list = this._tree.toList();
        this._map = {};
        this._list.forEach((field) => (this._map[field.name] = field));
        // On filled events
        if (this._list.length > 0) {
            // this._list[this._list.length - 1].onFilled = () => location.reload();
            if (this._list.length > 1) {
                const n = this._list.length - 1;
                for (let i = 0; i < n; i++) {
                    this._list[i].onFilled = () => {
                        // console.log(`${this._list[i].name} llama a ${this._list[i + 1].name}`);
                        this._list[i + 1].focus();
                    };
                }
            }
        }
        // Initialize value
        const initialValue = {};
        const initialValidity = {
            isValid: true,
            invalidStateMessages: {},
        };
        this.list.forEach((field) => {
            initialValue[field.name] = field.value;
            initialValidity.invalidStateMessages[field.name] = field.validity;
            initialValidity.isValid &&= field.isValid;
        });
        this._stateNotifier = new BehaviorSubject({
            value: initialValue,
            ...initialValidity,
            touched: false,
        });
        // Subscribe to changes
        this.list.forEach((field) => {
            field.stateChanges.subscribe((state) => {
                const nextState = this.state;
                nextState.value[field.name] = state.value;
                // nextState.isValid &&= state.isValid
                nextState.isValid = this.list.every((f) => f.isValid);
                nextState.invalidStateMessages[field.name] = {
                    isValid: state.isValid,
                    invalidStateMessages: state.invalidStateMessages,
                };
                nextState.touched &&= state.touched;
                this._stateNotifier.next(nextState);
            });
        });
    }
    // Fields
    get tree() {
        return this._tree;
    }
    get list() {
        return this._list;
    }
    get map() {
        return this._map;
    }
    // get fields(): AbstractFieldController<any, HTMLElement>[] {
    //   return this.list
    // }
    get(fieldName) {
        if (fieldName in this._map)
            return this._map[fieldName];
        return undefined;
    }
    // State
    get state() {
        return this._stateNotifier.value;
    }
    get stateChanges() {
        return this._stateNotifier.pipe(takeUntil(this.unsubscribe));
    }
    // Value
    get value() {
        return this._stateNotifier.value.value;
    }
    get valueChanges() {
        return this._stateNotifier.pipe(map((state) => state.value), takeUntil(this.unsubscribe));
    }
    patchValue(value) {
        Object.keys(value).map((fieldName) => {
            const field = this.get(fieldName);
            if (field) {
                const fieldValue = value[fieldName];
                field.setValue(fieldValue);
            }
        });
    }
    // Validity
    get isValid() {
        return this._stateNotifier.value.isValid;
    }
    get invalidStateMessages() {
        return this._stateNotifier.value.invalidStateMessages;
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
                invalidStateMessages: state.invalidStateMessages,
            };
        }), takeUntil(this.unsubscribe));
    }
    get touched() {
        return this._stateNotifier.value.touched;
    }
    get touchedChanges() {
        return this._stateNotifier.pipe(map((state) => state.touched), takeUntil(this.unsubscribe));
    }
    markAsTouched(focus = true) {
        this.list.forEach((field) => field.markAsTouched());
        if (focus) {
            this.list.find((field) => !field.isValid)?.focus();
        }
    }
    // General
    reset() {
        this.list.forEach((field) => field.reset());
    }
    clean() {
        this.list.forEach((field) => field.clean());
    }
    dispose() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}
//# sourceMappingURL=form.js.map