export interface FieldValidity {
    isValid: boolean;
    invalidStateMessages: string[];
}
export interface FormValidity {
    isValid: boolean;
    invalidStateMessages: {
        [key: string]: FieldValidity;
    };
}
interface State<T> {
    value: T;
    touched: boolean;
}
export interface FieldState<T> extends State<T>, FieldValidity {
}
export type ValuesMap = {
    [key: string]: any;
};
export interface FormState extends State<ValuesMap>, FormValidity {
}
export {};
//# sourceMappingURL=states.d.ts.map