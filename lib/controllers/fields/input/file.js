import { HtmlInput } from '../../../ui/html-input';
import { AbstractInputController, InputType, } from '../abstract-input';
export class FileInputController extends AbstractInputController {
    constructor(params) {
        super({ ...params, type: InputType.File });
        this.accept = params.accept;
        this.placeholder =
            params.placeholder !== undefined
                ? params.placeholder
                : 'Seleccione un archivo';
        // On filled events
        this.valueChanges.subscribe((value) => {
            if (value !== null) {
                this.onFilled();
            }
        });
    }
    // Html
    connectElements(textElement, fileElement) {
        textElement.setAttribute('placeholder', this.placeholder);
        // Set attributes
        Object.keys(this._attributes.value).forEach((name) => {
            const value = this._attributes.value[name];
            textElement.setAttribute(name, value);
        });
        // Subscribe to attributes changes
        this._attributes.changes.subscribe((changesList) => changesList.forEach((change) => {
            if (change.value !== undefined)
                textElement.setAttribute(change.name, change.value);
            else
                textElement.removeAttribute(change.name);
        }));
        // Initialize value
        this._setValueToElement(this.value, textElement);
        // Manage validity
        textElement.addEventListener('focusout', () => {
            this.markAsTouched();
        });
        // Subscribe to user changes
        fileElement.addEventListener('input', () => {
            const value = this._getValueFromElement(fileElement);
            this._setValueToElement(value, textElement);
            this._validateAndNotify(value);
        });
        // On * Enter *
        HtmlInput.addEnterKeyListener(textElement, () => {
            if (this.value !== null) {
                this.onFilled();
            }
            else {
                textElement.click();
            }
        });
        this._elementNotifier.next(textElement);
    }
    _getValueFromElement(element) {
        return element.files !== null ? element.files[0] : null;
    }
    _setValueToElement(value, element) {
        if (value === null) {
            element.setAttribute('placeholder', this.placeholder);
        }
        else {
            element.setAttribute('placeholder', value.name);
        }
    }
    _getDefaultValue() {
        return null;
    }
}
function makeFileInputExternalParams(params) {
    return { ...params, controlType: 'fileInput' };
}
// console.log('file.ts');
export { makeFileInputExternalParams };
//# sourceMappingURL=file.js.map