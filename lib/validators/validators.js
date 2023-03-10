import { invalidFileSize, invalidInput, invalidNumberRange } from './messages';
export class Validators {
    // static minlength(length: number): Validator<string> {
    //   return {
    //     validationFn: (value) => value.length >= length,
    //     message: '',
    //   };
    // }
    static numberRange({ min, max, }) {
        const validationFns = [];
        if (min !== undefined)
            validationFns.push((value) => value >= min);
        if (max !== undefined)
            validationFns.push((value) => value <= max);
        return {
            validationFn: (value) => {
                let i = 0;
                while (i < validationFns.length) {
                    if (!validationFns[i](value))
                        return false;
                    i++;
                }
                return true;
            },
            message: invalidNumberRange(min, max),
        };
    }
    static dni = {
        validationFn: (value) => Patterns.dni.test(value),
        message: invalidInput('DNI'),
    };
    static ruc = {
        validationFn: (value) => Patterns.ruc.test(value),
        message: invalidInput('RUC'),
    };
    static phone = {
        validationFn: (value) => Patterns.phone.test(value),
        message: invalidInput('número de teléfono'),
    };
    static phonePrefix = {
        validationFn: (value) => Patterns.phonePrefix.test(value),
        message: invalidInput('prefijo telefónico'),
    };
    static peruPhone = {
        validationFn: (value) => Patterns.peruPhone.test(value),
        message: invalidInput('teléfono móvil'),
    };
    static zipCode = {
        validationFn: (value) => Patterns.zipCode.test(value),
        message: invalidInput('código postal'),
    };
    static decimal = {
        validationFn: (value) => Patterns.decimal.test(value),
        message: invalidInput('número decimal'),
    };
    static email = {
        validationFn: (value) => Patterns.email.test(value),
        message: invalidInput('email'),
    };
    static fileSize(maxSizeBytes) {
        return {
            validationFn: (file) => {
                if (file === null) {
                    return false;
                }
                return file.size > maxSizeBytes;
            },
            message: invalidFileSize(maxSizeBytes),
        };
    }
    static minLenght(min) {
        return {
            validationFn: (text) => text.length >= min,
            message: `Input must be longer than or equal to ${min} characters`,
        };
    }
    static maxLenght(max) {
        return {
            validationFn: (text) => text.length <= max,
            message: `Input must be less than or equal to ${max} characters`,
        };
    }
}
export class Patterns {
    static dni = /^\d{8}$/;
    static ruc = /^[12][0567][0-9]{9}$/;
    /**
     * Phone number according to ITU-T E.164
     */
    static phone = /^[0-9]{0,14}$/;
    static phonePrefix = /^[1-9][0-9]{1,2}$/;
    static peruPhone = /^\d{9}$/;
    static zipCode = /^\d{5}$/;
    /**
     * Decimal number of 0 to 2 fractional digits and 1 to 10 non-fractional digits
     *
     * Example: 10, 15.9, 4958.13
     */
    static decimal = /^([0-9]{1,10}\.?[0-9]{0,2}|\.[0-9]{1,2})$/;
    // Source: https://emailregex.com/
    static email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}
//# sourceMappingURL=validators.js.map