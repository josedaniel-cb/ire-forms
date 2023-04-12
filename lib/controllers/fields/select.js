import { AbstractSelectController, } from './abstract-select';
export class SelectController extends AbstractSelectController {
    constructor(params) {
        super(params);
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
        // this.search = params.search !== undefined ? params.search : false;
        this.valueChanges.subscribe((value) => {
            if (value !== null) {
                this.onFilled();
            }
        });
    }
    // HTML
    connect(element) {
        super.connect(element);
        // Subscribe to user changes
        element.addEventListener('input', () => {
            const i = this._getIndexFromElement(element);
            this._validateAndNotify(i);
        });
    }
    // https://stackoverflow.com/a/14976638/11026079
    _getIndexFromElement(element) {
        if (element.selectedIndex === 0) {
            return this._defaultIndex;
        }
        return element.selectedIndex - 1;
    }
    _setIndexToElement(index, element) {
        element.selectedIndex = index + 1;
    }
}
function makeSelectExternalParams(params) {
    return { ...params, controlType: 'select' };
}
export { makeSelectExternalParams };
//# sourceMappingURL=select.js.map