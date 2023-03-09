import { BehaviorSubject, Observable } from 'rxjs';
import { Attributes } from '../core/attributes';
import { Validator } from '../validators/validators';
import { Form, FormController } from './form';
import { FieldState, FieldValidity } from '../core/states';
import { FormButtonSet, FormButtonSetArgs } from '../core/buttons/form-button-set';
import { FieldInterfacesMap } from './fields-map';
export interface AbstractField<T, E extends HTMLElement> {
    readonly form: Form;
    disabled: boolean;
    value: T;
    valueChanges: Observable<T>;
    setValue(value: T): Promise<void>;
    get state(): FieldState<T>;
    get stateChanges(): Observable<FieldState<T>>;
    get isValid(): boolean;
    get validity(): FieldValidity;
    get validityChanges(): Observable<FieldValidity>;
    get invalidStateMessages(): string[];
    get touched(): boolean;
    markAsTouched(): void;
    get element(): E | null;
    get elementAsync(): Promise<E>;
    get elementChanges(): Observable<E | null>;
    focus(): Promise<void>;
    blur(): Promise<void>;
    reset(): void;
    clean(): void;
    dispose(): void;
}
export declare abstract class AbstractFieldController<T = any, E extends HTMLElement = any> implements AbstractField<T, E> {
    readonly form: FormController;
    readonly buttons?: FormButtonSet;
    readonly name: string;
    readonly wrapperClasses?: string;
    readonly wrapperStyles?: string;
    readonly label?: string;
    protected readonly _attributes: Attributes;
    protected abstract readonly _stateNotifier: BehaviorSubject<FieldState<T>>;
    protected readonly _validators: Validator<T>[];
    protected readonly _elementNotifier: BehaviorSubject<E | null>;
    onFilled: () => void;
    constructor(params: AbstractFieldConstructorParams<T, E>);
    get disabled(): boolean;
    set disabled(value: boolean);
    get required(): boolean;
    set required(value: boolean);
    get value(): T;
    set value(value: T);
    abstract setValue(value: T): Promise<void>;
    get valueChanges(): Observable<T>;
    get state(): FieldState<T>;
    get stateChanges(): Observable<FieldState<T>>;
    get isValid(): boolean;
    get validity(): FieldValidity;
    get validityChanges(): Observable<FieldValidity>;
    get invalidStateMessages(): string[];
    get touched(): boolean;
    markAsTouched(): void;
    protected _markAsUntouched(): Promise<void>;
    get element(): E | null;
    get elementChanges(): Observable<E | null>;
    get renderedElementChanges(): Observable<E>;
    get elementAsync(): Promise<E>;
    connect(element: E): void;
    disconnect(): void;
    focus(): Promise<void>;
    blur(): Promise<void>;
    reset(): void;
    clean(): void;
    dispose(): void;
}
export type ControlType = keyof FieldInterfacesMap;
interface AbstractFieldBuilderParams<T, E extends HTMLElement> {
    label?: string;
    classes?: string;
    styles?: string;
    required?: boolean;
    disabled?: boolean;
    validators?: Validator<T>[];
    onRender?(element: E): void;
    buttons?: FormButtonSetArgs;
    onValueChange?(value: T): void;
    onValidityChange?(validity: FieldValidity): void;
    onStateChange?(state: FieldState<T>): void;
}
interface AbstractFieldExternalParams<T, E extends HTMLElement> extends AbstractFieldBuilderParams<T, E> {
    controlType: ControlType;
}
interface AbstractFieldConstructorParams<T, E extends HTMLElement> extends AbstractFieldBuilderParams<T, E> {
    name: string;
    form: FormController;
}
export type { AbstractFieldBuilderParams, AbstractFieldExternalParams, AbstractFieldConstructorParams, };
//# sourceMappingURL=abstract-field.d.ts.map