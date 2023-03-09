import { BehaviorSubject } from 'rxjs';
import { AbstractFieldController, AbstractFieldBuilderParams, AbstractFieldConstructorParams, AbstractFieldExternalParams, AbstractField } from '../abstract-field';
import { FieldState, FieldValidity } from '../../core/states';
export interface TextArea extends AbstractField<string, HTMLTextAreaElement> {
    get cols(): number | null;
    set cols(value: number | null);
    get rows(): number | null;
    set rows(value: number | null);
    get minlength(): number | null;
    set minlength(value: number | null);
    get maxlength(): number | null;
    set maxlength(value: number | null);
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get spellcheck(): string | null;
    set spellcheck(value: string | null);
    get wrap(): string | null;
    set wrap(value: string | null);
}
export declare class TextAreaController extends AbstractFieldController<string, HTMLTextAreaElement> implements TextArea {
    protected readonly _defaultValue: string;
    protected readonly _initialValue: string;
    protected readonly _stateNotifier: BehaviorSubject<FieldState<string>>;
    constructor(params: TextAreaConstructorParams);
    connect(element: HTMLTextAreaElement): void;
    protected _getValueFromElement(element: HTMLTextAreaElement): string;
    protected _setValueToElement(value: string, element: HTMLTextAreaElement): void;
    setValue(value: string): Promise<void>;
    protected _validate(value: string): FieldValidity;
    protected _validateAndNotify(value: string): void;
    reset(): void;
    clean(): void;
    get cols(): number | null;
    set cols(value: number | null);
    get rows(): number | null;
    set rows(value: number | null);
    get minlength(): number | null;
    set minlength(value: number | null);
    get maxlength(): number | null;
    set maxlength(value: number | null);
    get placeholder(): string | null;
    set placeholder(value: string | null);
    get spellcheck(): string | null;
    set spellcheck(value: string | null);
    get wrap(): string | null;
    set wrap(value: string | null);
}
interface BuilderParams extends AbstractFieldBuilderParams<string, HTMLTextAreaElement> {
    value?: string;
    cols?: number;
    rows?: number;
    minlength?: number;
    maxlength?: number;
    placeholder?: string;
    spellcheck?: 'checked' | 'false';
    wrap?: 'hard' | 'soft';
}
interface TextAreaExternalParams extends BuilderParams, AbstractFieldExternalParams<string, HTMLTextAreaElement> {
    controlType: 'textArea';
}
declare function makeTextAreaExternalParams(params: BuilderParams): TextAreaExternalParams;
interface TextAreaConstructorParams extends BuilderParams, AbstractFieldConstructorParams<string, HTMLTextAreaElement> {
}
export { makeTextAreaExternalParams };
export type { TextAreaExternalParams, TextAreaConstructorParams };
//# sourceMappingURL=textarea.d.ts.map