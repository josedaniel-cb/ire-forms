import { BehaviorSubject, Observable } from 'rxjs';
import { AbstractField, AbstractFieldBuilderParams, AbstractFieldConstructorParams, AbstractFieldController, AbstractFieldExternalParams } from '../abstract-field';
import { FieldState, FieldValidity } from '../../core/states';
import { CustomOption as Option } from './select/options';
interface OptionArgs<T> extends Option<T> {
    selected?: boolean;
}
export interface MultipleSelect<T> extends AbstractField<boolean[], HTMLElement> {
    get options(): Option<T>[];
    get selectedValues(): T[];
    updateOptions(options: OptionArgs<T>[]): void;
}
export declare class MultipleSelectController<T> extends AbstractFieldController<boolean[], HTMLElement> implements MultipleSelect<T> {
    protected readonly _optionsNotifier: BehaviorSubject<Option<T>[]>;
    private _emptyValue;
    protected _initialValue: boolean[];
    protected readonly _stateNotifier: BehaviorSubject<FieldState<boolean[]>>;
    constructor(params: MultipleSelectConstructorParams<T>);
    connect(element: HTMLElement): void;
    get options(): Option<T>[];
    get optionsChanges(): Observable<Option<T>[]>;
    updateOptions(optionsArgs: OptionArgs<T>[]): Promise<void>;
    setValue(value: boolean[]): Promise<void>;
    protected _validate(value: boolean[]): FieldValidity;
    protected _validateAndNotify(verifiedValue: boolean[]): void;
    protected _setValueToElement(value: boolean[], _: HTMLElement): void;
    handleSetValueToElement(value: boolean[]): void;
    handleClear(): void;
    reset(): void;
    clean(): void;
    get selectedValues(): NonNullable<T>[];
    markAsUntouched: () => Promise<void>;
    validateAndNotify: (verifiedValue: boolean[]) => void;
}
interface BuilderParams<T> extends AbstractFieldBuilderParams<boolean[], HTMLElement> {
    options: OptionArgs<T>[];
}
interface MultipleSelectExternalParams<T> extends BuilderParams<T>, AbstractFieldExternalParams<boolean[], HTMLElement> {
    controlType: 'multipleSelect';
}
export declare function makeMultipleSelectExternalParams<T>(params: BuilderParams<T>): MultipleSelectExternalParams<T>;
interface MultipleSelectConstructorParams<T> extends BuilderParams<T>, AbstractFieldConstructorParams<boolean[], HTMLElement> {
}
export type { MultipleSelectExternalParams, MultipleSelectConstructorParams, };
//# sourceMappingURL=multiple-select.d.ts.map