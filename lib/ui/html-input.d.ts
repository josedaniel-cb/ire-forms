export declare class HtmlInput {
    static setNumberInputBehavior(element: HTMLInputElement, { min, max, step, onChange, formatFn, }: {
        min: number;
        max: number;
        step: number;
        onChange(value: number): void;
        formatFn(value: number): string;
    }): void;
    static addEnterKeyListener(element: HTMLElement, callback: {
        (): void;
    }): void;
}
//# sourceMappingURL=html-input.d.ts.map