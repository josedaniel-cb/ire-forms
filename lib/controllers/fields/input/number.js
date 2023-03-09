import { HtmlInput } from '../../../ui/html-input';
import { Validators } from '../../../validators/validators';
import { AbstractInputController, InputType, } from '../abstract-input';
export class NumberInputController extends AbstractInputController {
    static min = Number.MIN_SAFE_INTEGER;
    static max = Number.MAX_SAFE_INTEGER;
    _min;
    _max;
    _step;
    _fractionDigits;
    _buildingFloat = false;
    constructor(params) {
        super({ ...params, type: InputType.Number });
        if (params.placeholder !== undefined)
            this.placeholder = params.placeholder;
        // Number range
        if (params.min !== undefined &&
            params.max !== undefined &&
            params.min <= params.max) {
            this._min = params.min;
            this._max = params.max;
        }
        else {
            this._min =
                params.min !== undefined ? params.min : NumberInputController.min;
            this._max =
                params.max !== undefined ? params.max : NumberInputController.max;
        }
        this._validators.push(Validators.numberRange({
            max: params.max,
            min: params.min,
        }));
        // Keyboard arrows gap
        this._step = params.step !== undefined ? params.step : 1;
        if (params.fractionDigits !== undefined && params.fractionDigits >= 0)
            this._fractionDigits = params.fractionDigits;
        if (this._initialValue !== this._defaultValue) {
            this._validateAndNotify(this.value);
        }
    }
    // Html
    connect(element) {
        super.connect(element);
        HtmlInput.setNumberInputBehavior(element, {
            min: this._min,
            max: this._max,
            step: this._step,
            onChange: (value) => this._validateAndNotify(value),
            formatFn: (value) => this._formatValue(value),
        });
        HtmlInput.addEnterKeyListener(element, this.onFilled);
        if (this._fractionDigits !== undefined && !isNaN(this.value)) {
            element.addEventListener('focusout', () => {
                if (isNaN(this.value)) {
                    element.value = '';
                }
                else {
                    element.value = this.value.toFixed(this._fractionDigits);
                }
            });
        }
    }
    async setValue(value) {
        if (this._fractionDigits !== undefined && !isNaN(value))
            value = Number.parseFloat(value.toFixed(this._fractionDigits));
        super.setValue(value);
    }
    _isEmpty(value) {
        return isNaN(value);
    }
    _getValueFromElement(element) {
        // Get numeric value
        let value = Number.parseFloat(element.value);
        // Clear if NaN
        if (Number.isNaN(value)) {
            element.value = '';
            return NaN;
        }
        // If building float
        if (element.value.charAt(element.value.length - 1) === '.') {
            return value;
        }
        if (this._fractionDigits !== undefined) {
            const decimal = value.toString().split('.')[1];
            if (decimal !== undefined) {
                if (decimal.length > this._fractionDigits) {
                    element.value = value.toFixed(this._fractionDigits);
                    value = Number.parseFloat(element.value);
                }
            }
        }
        return value;
    }
    _setValueToElement(value, element) {
        element.value = this._formatValue(value);
    }
    _formatValue(value) {
        if (isNaN(value)) {
            return '';
        }
        if (this._fractionDigits === undefined) {
            return value.toString();
        }
        return value.toFixed(this._fractionDigits);
    }
    _getDefaultValue() {
        return NaN;
    }
    get placeholder() {
        return this._attributes.get('placeholder');
    }
    set placeholder(value) {
        this._attributes.set('placeholder', value);
    }
}
function makeNumberInputExternalParams(params) {
    return { ...params, controlType: 'numberInput' };
}
export { makeNumberInputExternalParams };
//# sourceMappingURL=number.js.map