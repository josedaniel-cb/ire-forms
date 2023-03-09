export interface Validator<T> {
    /**
     * Function that verify input validity
     */
    validationFn: {
        (value: T): boolean;
    };
    /**
     * Invalid input message
     */
    message: string;
}
export declare class Validators {
    static numberRange({ min, max, }: {
        min?: number;
        max?: number;
    }): Validator<number>;
    static readonly dni: Validator<string>;
    static readonly ruc: Validator<string>;
    static readonly phone: Validator<string>;
    static readonly phonePrefix: Validator<string>;
    static readonly peruPhone: Validator<string>;
    static readonly zipCode: Validator<string>;
    static readonly decimal: Validator<string>;
    static readonly email: Validator<string>;
    static fileSize(maxSizeBytes: number): Validator<File | null>;
    static minLenght(min: number): Validator<string>;
    static maxLenght(max: number): Validator<string>;
}
export declare class Patterns {
    static readonly dni: RegExp;
    static readonly ruc: RegExp;
    /**
     * Phone number according to ITU-T E.164
     */
    static readonly phone: RegExp;
    static readonly phonePrefix: RegExp;
    static readonly peruPhone: RegExp;
    static readonly zipCode: RegExp;
    /**
     * Decimal number of 0 to 2 fractional digits and 1 to 10 non-fractional digits
     *
     * Example: 10, 15.9, 4958.13
     */
    static readonly decimal: RegExp;
    static readonly email: RegExp;
}
//# sourceMappingURL=validators.d.ts.map