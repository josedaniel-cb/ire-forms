import { AbstractSelectController, } from '../abstract-select';
export class CustomSelectController extends AbstractSelectController {
    constructor(params) {
        super(params);
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
        this.valueChanges.subscribe((value) => {
            if (value !== null) {
                this.onFilled();
            }
        });
    }
    get placeholder() {
        return this._attributes.get('placeholder');
    }
    set placeholder(value) {
        this._attributes.set('placeholder', value);
    }
    get validateAndNotify() {
        return this._validateAndNotify;
    }
    get markAsUntouched() {
        return this._markAsUntouched;
    }
    _setIndexToElement(index, _) {
        this.handleSetIndexToElement(index);
    }
    // Will be overwritten by CustomSelectElement
    handleSetIndexToElement(index) { }
}
export const makeCustomSelectExternalParams = (params) => {
    return { ...params, controlType: 'customSelect' };
};
//# sourceMappingURL=custom-select.js.map