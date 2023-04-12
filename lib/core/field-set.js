import { buildFieldController } from './field-builder';
export class FieldSet {
    constructor(params) {
        this.form = params.form;
        this.fields = Object.keys(params.fields).map((key) => {
            const child = params.fields[key];
            if ('fields' in child) {
                const externalParams = child;
                return new FieldSet({
                    ...externalParams,
                    form: this.form,
                });
            }
            const externalParams = child;
            return buildFieldController(externalParams, this.form, key);
        });
        this.legend = params.legend;
        this.classes = params.classes;
        this.styles = params.styles;
        this.layout = params.layout;
    }
    toList() {
        return this._toList(this.fields);
    }
    _toList(fields) {
        const array = [];
        fields.forEach((child) => {
            if (child instanceof FieldSet) {
                array.push(...this._toList(child.fields));
            }
            else {
                array.push(child);
            }
        });
        return array;
    }
}
//# sourceMappingURL=field-set.js.map