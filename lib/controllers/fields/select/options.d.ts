import { HTMLTemplateResult } from 'lit';
export interface Option<T> {
    value: NonNullable<T>;
}
export interface SimpleOption<T> extends Option<T> {
    label: string;
}
export interface CustomOption<T> extends Option<T> {
    textValue?: string;
    template?: HTMLTemplateResult;
}
//# sourceMappingURL=options.d.ts.map