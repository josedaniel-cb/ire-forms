import { BehaviorSubject } from 'rxjs';
import { AbstractFieldController, AbstractFieldBuilderParams, AbstractFieldConstructorParams, AbstractFieldExternalParams, AbstractField } from '../abstract-field';
import { FieldState, FieldValidity } from '../../core/states';
export interface AbstractInput<T> extends AbstractField<T, HTMLInputElement> {
}
export declare abstract class AbstractInputController<T = NonNullable<any> | null> extends AbstractFieldController<T, HTMLInputElement> implements AbstractInput<T> {
    readonly type: InputType;
    protected readonly _defaultValue: T;
    protected readonly _initialValue: T;
    protected readonly _stateNotifier: BehaviorSubject<FieldState<T>>;
    constructor(params: AbstractInputConstructorParams<T>);
    connect(element: HTMLInputElement): void;
    protected abstract _getValueFromElement(element: HTMLInputElement): T;
    protected abstract _setValueToElement(value: T, element: HTMLInputElement): void;
    setValue(value: T): Promise<void>;
    protected abstract _getDefaultValue(): T;
    protected _isEmpty(value: T): boolean;
    protected _validate(value: T): FieldValidity;
    protected _validateAndNotify(value: T): void;
    reset(): void;
    clean(): void;
}
export declare enum InputType {
    Button = "button",
    Checkbox = "checkbox",
    Color = "color",
    Date = "date",
    DatetimeLocal = "datetime-local",
    Email = "email",
    File = "file",
    Hidden = "hidden",
    Image = "image",
    Month = "month",
    Number = "number",
    Password = "password",
    Radio = "radio",
    Range = "range",
    Reset = "reset",
    Search = "search",
    Submit = "submit",
    Tel = "tel",
    Text = "text",
    Time = "time",
    Url = "url",
    Week = "week"
}
interface AbstractInputBuilderParams<T> extends AbstractFieldBuilderParams<T, HTMLInputElement> {
    value?: T;
    type: InputType;
}
interface AbstractInputExternalParams<T> extends AbstractInputBuilderParams<T>, AbstractFieldExternalParams<T, HTMLInputElement> {
}
interface AbstractInputConstructorParams<T> extends AbstractInputBuilderParams<T>, AbstractFieldConstructorParams<T, HTMLInputElement> {
}
export type { AbstractInputBuilderParams, AbstractInputExternalParams, AbstractInputConstructorParams, };
interface AbstractSubInputBuilderParams<T> extends Omit<AbstractInputBuilderParams<T>, 'type'> {
}
interface AbstractSubInputExternalParams<T> extends AbstractSubInputBuilderParams<T>, AbstractFieldExternalParams<T, HTMLInputElement> {
}
interface AbstractSubInputConstructorParams<T> extends AbstractSubInputBuilderParams<T>, AbstractFieldConstructorParams<T, HTMLInputElement> {
}
export type { AbstractSubInputBuilderParams, AbstractSubInputExternalParams, AbstractSubInputConstructorParams, };
//# sourceMappingURL=abstract-input.d.ts.map