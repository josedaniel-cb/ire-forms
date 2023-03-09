import { AbstractSelect, AbstractSelectBuilderParams, AbstractSelectConstructorParams, AbstractSelectController, AbstractSelectExternalParams } from './abstract-select';
import { SimpleOption } from './select/options';
export interface Select extends AbstractSelect<any, SimpleOption<any>, HTMLSelectElement> {
    readonly placeholder?: string;
}
export declare class SelectController extends AbstractSelectController<any, SimpleOption<any>, HTMLSelectElement> implements Select {
    readonly placeholder?: string;
    constructor(params: SelectConstructorParams<any>);
    connect(element: HTMLSelectElement): void;
    protected _getIndexFromElement(element: HTMLSelectElement): number;
    protected _setIndexToElement(index: number, element: HTMLSelectElement): void;
}
interface BuilderParams<T> extends AbstractSelectBuilderParams<T, SimpleOption<T>, HTMLSelectElement> {
    placeholder?: string;
}
interface SelectExternalParams<T> extends BuilderParams<T>, AbstractSelectExternalParams<T, SimpleOption<T>, HTMLSelectElement> {
    controlType: 'select';
}
declare function makeSelectExternalParams<T>(params: BuilderParams<T>): SelectExternalParams<T>;
interface SelectConstructorParams<T> extends BuilderParams<T>, AbstractSelectConstructorParams<T, SimpleOption<T>, HTMLSelectElement> {
}
export { makeSelectExternalParams };
export type { SelectExternalParams, SelectConstructorParams };
//# sourceMappingURL=select.d.ts.map