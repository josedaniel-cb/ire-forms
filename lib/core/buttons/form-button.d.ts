type FormButtonMode = 'text' | 'filled' | 'outline';
export declare class FormButton {
    icon?: string;
    readonly label?: string;
    readonly mode: FormButtonMode;
    readonly squareAspectRatio: boolean;
    readonly rounded: boolean;
    onClick: () => void;
    protected constructor(args: FormButtonArgs);
    static build(args: FormButtonArgs): FormButton;
}
export interface FormButtonArgs {
    icon?: string;
    label?: string;
    mode: FormButtonMode;
    rounded: boolean;
    squareAspectRatio: boolean;
    onClick: () => void;
}
export interface FormButtonExternalArgs {
    label?: string;
    icon?: string;
    mode?: FormButtonMode;
    rounded?: boolean;
    squareAspectRatio?: boolean;
    onClick: () => void;
}
export declare const makeIconButtonArgs: (args: FormButtonExternalArgs) => FormButtonArgs;
export declare const makeButtonArgs: (args: FormButtonExternalArgs) => FormButtonArgs;
export {};
//# sourceMappingURL=form-button.d.ts.map