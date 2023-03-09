import { AbstractInputController, AbstractSubInputBuilderParams, AbstractSubInputExternalParams, AbstractSubInputConstructorParams, InputType, AbstractInput } from '../abstract-input';
export interface AbstractTextInput extends AbstractInput<string> {
    get placeholder(): string | null;
    set placeholder(value: string | null);
}
export declare abstract class AbstractTextInputController extends AbstractInputController<string> implements AbstractTextInput {
    constructor(params: AbstractTextInputConstructorParams);
    connect(element: HTMLInputElement): void;
    protected _getValueFromElement(element: HTMLInputElement): string;
    protected _setValueToElement(value: string, element: HTMLInputElement): void;
    protected _getDefaultValue(): string;
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get maxlength(): number | null;
    set maxlength(value: number | null);
}
interface AbstractTextInputBuilderParams extends AbstractSubInputBuilderParams<string> {
    maxlength?: number;
    placeholder?: string;
}
interface AbstractTextInputExternalParams extends AbstractTextInputBuilderParams, AbstractSubInputExternalParams<string> {
}
interface AbstractTextInputConstructorParams extends AbstractTextInputBuilderParams, AbstractSubInputConstructorParams<string> {
    type: InputType;
}
export type { AbstractTextInputBuilderParams, AbstractTextInputExternalParams, AbstractTextInputConstructorParams, };
//# sourceMappingURL=abstract-text.d.ts.map