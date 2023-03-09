import { AbstractSelectController, } from '../abstract-select';
export class RadiosController extends AbstractSelectController {
    constructor(params) {
        super(params);
        // this.renderedElementChanges.subscribe((element) => {
        //   HtmlInput.addEnterKeyListener(element, this.onFilled);
        // });
        this.valueChanges.subscribe((value) => {
            if (value !== null) {
                this.onFilled();
            }
        });
    }
    // HTML
    connect(element) {
        super.connect(element);
        // Subscribe to user input
        // https://stackoverflow.com/a/55384108/11026079
        element.addEventListener('click', (event) => {
            if (event.target && event.target.matches('input')) {
                const i = this._getIndexFromElement(element);
                this._validateAndNotify(i);
            }
        });
    }
    _getIndexFromElement(element) {
        const radios = Array.from(element.querySelectorAll('input'));
        let i = 0;
        while (i < radios.length) {
            if (radios[i].checked)
                return i;
            i++;
        }
        return this._defaultIndex;
    }
    _setIndexToElement(index, element) {
        if (index !== this._defaultIndex) {
            element.querySelectorAll('input')[index].checked = true;
        }
        else {
            const radios = Array.from(element.querySelectorAll('input'));
            let i = 0;
            while (i < radios.length) {
                if (radios[i].checked) {
                    radios[i].checked = false;
                    break;
                }
                i++;
            }
        }
    }
    async focus() {
        const element = await this.elementAsync;
        const firstRadio = element.querySelector('input');
        if (firstRadio !== null) {
            firstRadio.focus();
        }
        else {
            const rect = element.getBoundingClientRect();
            window.scrollTo(rect.left, rect.top);
        }
    }
}
function makeRadiosExternalParams(params) {
    return { ...params, controlType: 'radios' };
}
export { makeRadiosExternalParams };
//# sourceMappingURL=radios.js.map