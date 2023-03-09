import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FieldSet, FieldSetExternalParams } from '../core/field-set';
import { AbstractField, AbstractFieldController } from './abstract-field';
import { FieldValidity, FormState, FormValidity, ValuesMap } from '../core/states';
import { FieldInterfacesMap } from './fields-map';
import { Flatten } from '../core/flatten';
export type FieldsMap = {
    [key: string]: AbstractFieldController<any, HTMLElement>;
};
type BaseType = {
    controlType: keyof FieldInterfacesMap;
};
type GetInstancesMap<T extends {
    [key: string]: BaseType;
}> = {
    [K in keyof T]: FieldInterfacesMap[T[K]['controlType']];
};
type FormProxy<T extends FormParams> = {
    fields: GetInstancesMap<Flatten<T, BaseType>>;
};
export type Form2<T extends FormParams> = Form & FormProxy<T>;
export interface Form {
    get(fieldName: string): AbstractField<any, HTMLElement> | undefined;
    get state(): FormState;
    get value(): ValuesMap;
    get valueChanges(): Observable<ValuesMap>;
    patchValue(value: ValuesMap): void;
    get isValid(): boolean;
    get validity(): FormValidity;
    get validityChanges(): Observable<FormValidity>;
    get touched(): boolean;
    get touchedChanges(): Observable<boolean>;
    markAsTouched(): void;
    reset(): void;
    clean(): void;
    dispose(): void;
}
export declare class FormController implements Form {
    readonly unsubscribe: Subject<void>;
    protected _tree: FieldSet;
    protected _list: AbstractFieldController<any, HTMLElement>[];
    protected _map: FieldsMap;
    protected _stateNotifier: BehaviorSubject<FormState>;
    static build(params: FormParams): FormController;
    static build2<T extends FormParams>(params: T): Form2<T>;
    protected constructor();
    protected _setFields(tree: FieldSet): void;
    get tree(): FieldSet;
    get list(): AbstractFieldController<any, HTMLElement>[];
    get map(): FieldsMap;
    get(fieldName: string): AbstractFieldController<any, HTMLElement> | undefined;
    get state(): FormState;
    get stateChanges(): Observable<FormState>;
    get value(): ValuesMap;
    get valueChanges(): Observable<ValuesMap>;
    patchValue(value: ValuesMap): void;
    get isValid(): boolean;
    get invalidStateMessages(): {
        [key: string]: FieldValidity;
    };
    get validity(): FormValidity;
    get validityChanges(): Observable<FormValidity>;
    get touched(): boolean;
    get touchedChanges(): Observable<boolean>;
    markAsTouched(focus?: boolean): void;
    reset(): void;
    clean(): void;
    dispose(): void;
}
interface FormParams extends FieldSetExternalParams {
    onValueChange?(value: ValuesMap): void;
    onValidityChange?(valid: FormValidity): void;
    onStateChange?(state: FormState): void;
}
export type { FormParams };
//# sourceMappingURL=form.d.ts.map