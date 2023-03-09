import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractField, AbstractFieldBuilderParams, AbstractFieldConstructorParams, AbstractFieldController, AbstractFieldExternalParams } from '../abstract-field';
import { FieldState, FieldValidity } from '../../core/states';
import { Option } from './select/options';
export interface AbstractSelect<T extends NonNullable<any>, O extends Option<T>, E extends HTMLElement> extends AbstractField<T, E> {
    get options(): O[];
    updateOptions(params: {
        options: O[];
        index?: number;
    }): void;
    get index(): number;
    set index(i: number);
    get indexChanges(): Observable<number>;
    setIndex(index: number): Promise<void>;
    getValueFromIndex(index: number): T | null;
}
export declare abstract class AbstractSelectController<T extends NonNullable<any> = NonNullable<any>, O extends Option<T> = any, E extends HTMLElement = any> extends AbstractFieldController<T | null, E> implements AbstractSelect<T | null, O, E> {
    protected readonly _optionsNotifier: BehaviorSubject<O[]>;
    protected readonly _defaultIndex: number;
    protected _initialIndex: number;
    protected readonly _indexNotifier: BehaviorSubject<number>;
    protected readonly _stateNotifier: BehaviorSubject<FieldState<T | null>>;
    constructor(params: AbstractSelectConstructorParams<T | null, O, E>);
    connect(element: E): void;
    get options(): O[];
    get optionsChanges(): Observable<O[]>;
    updateOptions(params: {
        options: O[];
        index?: number;
    }): void;
    get index(): number;
    set index(i: number);
    get indexChanges(): Observable<number>;
    protected _checkIndex(index: number | undefined): number;
    setIndex(index: number): Promise<void>;
    getValueFromIndex(index: number): T | null;
    get isEmpty(): boolean;
    setValue(value: T | null): Promise<void>;
    protected _validate(index: number): FieldValidity;
    protected _validateAndNotify(index: number): void;
    protected abstract _setIndexToElement(index: number, element: HTMLElement): void;
    reset(): void;
    clean(): void;
}
interface AbstractSelectBuilderParams<T, O extends Option<T>, E extends HTMLElement> extends AbstractFieldBuilderParams<T, E> {
    index?: number;
    options: O[];
    onIndexChange?(index: number): void;
}
interface AbstractSelectExternalParams<T, O extends Option<T>, E extends HTMLElement> extends AbstractSelectBuilderParams<T, O, E>, AbstractFieldExternalParams<T, E> {
}
interface AbstractSelectConstructorParams<T, O extends Option<T>, E extends HTMLElement> extends AbstractSelectBuilderParams<T, O, E>, AbstractFieldConstructorParams<T, E> {
}
export type { AbstractSelectBuilderParams, AbstractSelectExternalParams, AbstractSelectConstructorParams, };
//# sourceMappingURL=abstract-select.d.ts.map