import { Observable, Subject } from 'rxjs';
export type AttributesMap = {
    [key: string]: string;
};
export type AttributeChange = {
    name: string;
    value: string | undefined;
};
export declare abstract class AbstractAttributes {
    protected readonly _unsubscribe: Subject<void>;
    protected _map: AttributesMap;
    protected _changesNotifier: Subject<AttributeChange[]>;
    constructor(map?: AttributesMap);
    protected get _changes(): Observable<AttributeChange[]>;
    get value(): AttributesMap;
    get(name: string): string | null;
    set(name: string, value: string | null): void;
    getBoolean(name: string): boolean;
    setBoolean(name: string, value?: boolean): void;
    getNumber(name: string): number | null;
    setNumber(name: string, value: number | null): void;
    getDate(name: string): Date | null;
    setDate(name: string, value: Date | null): void;
    remove(name: string): void;
    patch(attributes: AttributesMap): void;
    protected _dispose(): void;
}
export declare class Attributes extends AbstractAttributes {
    get changes(): Observable<AttributeChange[]>;
    dispose(): void;
}
//# sourceMappingURL=attributes.d.ts.map