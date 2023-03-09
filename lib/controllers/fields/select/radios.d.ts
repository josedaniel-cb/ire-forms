import { AbstractSelect, AbstractSelectBuilderParams, AbstractSelectConstructorParams, AbstractSelectController, AbstractSelectExternalParams } from '../abstract-select';
import { SimpleOption } from './options';
export interface Radios extends AbstractSelect<any, SimpleOption<any>, HTMLElement> {
}
export declare class RadiosController extends AbstractSelectController<any, SimpleOption<any>, HTMLElement> implements Radios {
    constructor(params: RadiosConstructorParams<any>);
    connect(element: HTMLElement): void;
    protected _getIndexFromElement(element: HTMLElement): number;
    protected _setIndexToElement(index: number, element: HTMLElement): void;
    focus(): Promise<void>;
}
interface BuilderParams<T> extends AbstractSelectBuilderParams<T, SimpleOption<T>, HTMLElement> {
}
interface RadiosExternalParams<T> extends BuilderParams<T>, AbstractSelectExternalParams<T, SimpleOption<T>, HTMLElement> {
    controlType: 'radios';
}
interface RadiosConstructorParams<T> extends BuilderParams<T>, AbstractSelectConstructorParams<T, SimpleOption<T>, HTMLElement> {
}
declare function makeRadiosExternalParams<T>(params: BuilderParams<T>): RadiosExternalParams<T>;
export { makeRadiosExternalParams };
export type { RadiosExternalParams, RadiosConstructorParams };
//# sourceMappingURL=radios.d.ts.map