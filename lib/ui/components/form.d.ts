import { LitElement, HTMLTemplateResult } from 'lit';
import { FieldSet } from '../../core/field-set';
import { AbstractFieldController } from '../../controllers/abstract-field';
import { FormController } from '../../controllers/form';
import './fields/input';
import './fields/input/password';
import './fields/input/checkbox';
import './fields/input/file';
import './fields/select';
import './fields/select/radios';
import './fields/select/custom-select';
import './fields/textarea';
import './fields/multiple-select';
export declare class FormElement extends LitElement {
    static styles: import("lit").CSSResult[];
    controller?: FormController;
    render(): import("lit-html").TemplateResult<1>;
    protected _renderFieldSet(fieldset: FieldSet): HTMLTemplateResult;
    protected _renderField(controller: AbstractFieldController): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=form.d.ts.map