import { AbstractInput, AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputConstructorParams, AbstractSubInputExternalParams } from '../abstract-input';
export interface TimeInput extends AbstractInput<string | null> {
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get min(): string | null;
    set min(value: string | null);
    get max(): string | null;
    set max(value: string | null);
    get step(): number | null;
    set step(value: number | null);
}
export declare class TimeInputController extends AbstractInputController<string | null> implements TimeInput {
    constructor(params: TimeInputConstructorParams);
    connect(element: HTMLInputElement): void;
    protected _getValueFromElement(element: HTMLInputElement): string | null;
    protected _setValueToElement(value: string | null, element: HTMLInputElement): void;
    protected _getDefaultValue(): string | null;
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get min(): string | null;
    set min(value: string | null);
    get max(): string | null;
    set max(value: string | null);
    get step(): number | null;
    set step(value: number | null);
}
interface BuilderParams extends AbstractSubInputBuilderParams<string | null> {
    /**
     * HH:mm
     */
    value?: string | null;
    /**
     * HH:mm
     */
    min?: string;
    /**
     * HH:mm
     */
    max?: string;
    step?: number;
    placeholder?: string;
}
interface TimeInputExternalParams extends BuilderParams, AbstractSubInputExternalParams<string | null> {
    controlType: 'timeInput';
}
declare function makeTimeInputExternalParams(params: BuilderParams): TimeInputExternalParams;
interface TimeInputConstructorParams extends BuilderParams, AbstractSubInputConstructorParams<string | null> {
}
export { makeTimeInputExternalParams };
export type { TimeInputExternalParams, TimeInputConstructorParams };
//# sourceMappingURL=time.d.ts.map