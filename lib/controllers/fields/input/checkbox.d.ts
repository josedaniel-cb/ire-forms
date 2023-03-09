import { AbstractInput, AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputConstructorParams, AbstractSubInputExternalParams } from '../abstract-input';
export interface CheckboxInput extends AbstractInput<boolean> {
}
export declare class CheckboxInputController extends AbstractInputController<boolean> implements CheckboxInput {
    constructor(params: CheckboxInputConstructorParams);
    connect(element: HTMLInputElement): void;
    protected _isEmpty(value: boolean): boolean;
    protected _getValueFromElement(element: HTMLInputElement): boolean;
    protected _setValueToElement(value: boolean, element: HTMLInputElement): void;
    protected _getDefaultValue(): boolean;
}
interface BuilderParams extends AbstractSubInputBuilderParams<boolean> {
}
interface CheckboxInputExternalParams extends BuilderParams, AbstractSubInputExternalParams<boolean> {
    controlType: 'checkboxInput';
}
declare function makeCheckboxInputExternalParams(params: BuilderParams): CheckboxInputExternalParams;
interface CheckboxInputConstructorParams extends BuilderParams, AbstractSubInputConstructorParams<boolean> {
}
export { makeCheckboxInputExternalParams };
export type { CheckboxInputExternalParams, CheckboxInputConstructorParams };
//# sourceMappingURL=checkbox.d.ts.map