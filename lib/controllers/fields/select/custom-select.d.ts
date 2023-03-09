import { CustomOption } from './options';
import { AbstractSelect, AbstractSelectBuilderParams, AbstractSelectConstructorParams, AbstractSelectController, AbstractSelectExternalParams } from '../abstract-select';
export interface CustomSelect extends AbstractSelect<any, CustomOption<any>, HTMLInputElement> {
    get placeholder(): string | null;
    set placeholder(value: string | null);
}
export declare class CustomSelectController extends AbstractSelectController<any, CustomOption<any>, HTMLInputElement> implements CustomSelect {
    constructor(params: CustomSelectConstructorParams<any>);
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get validateAndNotify(): (index: number) => void;
    get markAsUntouched(): () => Promise<void>;
    protected _setIndexToElement(index: number, _: HTMLInputElement): void;
    handleSetIndexToElement(index: number): void;
}
export interface CustomSelectBuilderParams<T> extends AbstractSelectBuilderParams<T, CustomOption<T>, HTMLInputElement> {
    placeholder?: string;
}
export interface CustomSelectExternalParams<T> extends CustomSelectBuilderParams<T>, AbstractSelectExternalParams<T, CustomOption<T>, HTMLInputElement> {
    controlType: 'customSelect';
}
export declare const makeCustomSelectExternalParams: <T>(params: CustomSelectBuilderParams<T>) => CustomSelectExternalParams<T>;
export interface CustomSelectConstructorParams<T> extends CustomSelectBuilderParams<T>, AbstractSelectConstructorParams<T, CustomOption<T>, HTMLInputElement> {
}
//# sourceMappingURL=custom-select.d.ts.map