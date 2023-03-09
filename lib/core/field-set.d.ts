import { AbstractFieldController } from '../controllers/abstract-field';
import { FieldArgs } from '../controllers/fields-map';
import { FormController } from '../controllers/form';
export type Layout = {
    classes: string;
    styles: string;
};
export declare class FieldSet {
    readonly form: FormController;
    readonly fields: (AbstractFieldController | FieldSet)[];
    readonly legend?: string;
    readonly classes?: string;
    readonly styles?: string;
    readonly layout?: Layout;
    constructor(params: FieldGroupParams);
    toList(): AbstractFieldController[];
    private _toList;
}
interface FieldSetExternalParams {
    fields: {
        [key: string]: FieldArgs | FieldSetExternalParams;
    };
    legend?: string;
    classes?: string;
    styles?: string;
    layout?: Layout;
}
interface FieldGroupParams extends FieldSetExternalParams {
    form: FormController;
}
export type { FieldSetExternalParams, FieldGroupParams };
//# sourceMappingURL=field-set.d.ts.map