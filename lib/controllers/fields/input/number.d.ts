import { AbstractInput, AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputConstructorParams, AbstractSubInputExternalParams } from '../abstract-input';
export interface NumberInput extends AbstractInput<number> {
    get placeholder(): string | null;
    set placeholder(value: string | null);
}
export declare class NumberInputController extends AbstractInputController<number> implements NumberInput {
    static readonly min: number;
    static readonly max: number;
    protected readonly _min: number;
    protected readonly _max: number;
    protected readonly _step: number;
    protected readonly _fractionDigits?: number;
    protected _buildingFloat: boolean;
    constructor(params: NumberInputConstructorParams);
    connect(element: HTMLInputElement): void;
    setValue(value: number): Promise<void>;
    protected _isEmpty(value: number): boolean;
    protected _getValueFromElement(element: HTMLInputElement): number;
    protected _setValueToElement(value: number, element: HTMLInputElement): void;
    protected _formatValue(value: number): string;
    protected _getDefaultValue(): number;
    get placeholder(): string | null;
    set placeholder(value: string | null);
}
interface BuilderParams extends AbstractSubInputBuilderParams<number> {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    fractionDigits?: number;
}
interface NumberInputExternalParams extends BuilderParams, AbstractSubInputExternalParams<number> {
    controlType: 'numberInput';
}
declare function makeNumberInputExternalParams(params: BuilderParams): NumberInputExternalParams;
interface NumberInputConstructorParams extends BuilderParams, AbstractSubInputConstructorParams<number> {
}
export { makeNumberInputExternalParams };
export type { NumberInputExternalParams, NumberInputConstructorParams };
//# sourceMappingURL=number.d.ts.map