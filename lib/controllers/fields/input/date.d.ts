import { AbstractInput, AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputConstructorParams, AbstractSubInputExternalParams } from '../abstract-input';
export interface DateInput extends AbstractInput<Date | null> {
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get min(): string | null;
    set min(value: string | null);
    get max(): string | null;
    set max(value: string | null);
    get step(): number | null;
    set step(value: number | null);
}
export declare class DateInputController extends AbstractInputController<Date | null> implements DateInput {
    constructor(params: DateInputConstructorParams);
    connect(element: HTMLInputElement): void;
    protected _getValueFromElement(element: HTMLInputElement): Date | null;
    protected _setValueToElement(value: Date | null, element: HTMLInputElement): void;
    protected _getDefaultValue(): Date | null;
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get min(): string | null;
    set min(value: string | null);
    get max(): string | null;
    set max(value: string | null);
    get step(): number | null;
    set step(value: number | null);
}
interface BuilderParams extends AbstractSubInputBuilderParams<Date | null> {
    /**
     * YYYY-MM-DD
     */
    min?: string;
    /**
     * YYYY-MM-DD
     */
    max?: string;
    step?: number;
    placeholder?: string;
}
interface DateInputExternalParams extends BuilderParams, AbstractSubInputExternalParams<Date | null> {
    controlType: 'dateInput';
}
declare function makeDateInputExternalParams(params: BuilderParams): DateInputExternalParams;
interface DateInputConstructorParams extends BuilderParams, AbstractSubInputConstructorParams<Date | null> {
}
export { makeDateInputExternalParams };
export type { DateInputExternalParams, DateInputConstructorParams };
//# sourceMappingURL=date.d.ts.map