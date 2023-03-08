import { invalidFileSize, invalidInput, invalidNumberRange } from './messages'

export interface Validator<T> {
  /**
   * Function that verify input validity
   */
  validationFn: { (value: T): boolean }
  /**
   * Invalid input message
   */
  message: string
}

export class Validators {
  // static minlength(length: number): Validator<string> {
  //   return {
  //     validationFn: (value) => value.length >= length,
  //     message: '',
  //   };
  // }

  static numberRange({
    min,
    max,
  }: {
    min?: number
    max?: number
  }): Validator<number> {
    const validationFns: { (value: number): boolean }[] = []
    if (min !== undefined) validationFns.push((value) => value >= min)
    if (max !== undefined) validationFns.push((value) => value <= max)
    return {
      validationFn: (value) => {
        let i = 0
        while (i < validationFns.length) {
          if (!validationFns[i](value)) return false
          i++
        }
        return true
      },
      message: invalidNumberRange(min, max),
    }
  }

  static readonly dni: Validator<string> = {
    validationFn: (value) => Patterns.dni.test(value),
    message: invalidInput('DNI'),
  }

  static readonly ruc: Validator<string> = {
    validationFn: (value) => Patterns.ruc.test(value),
    message: invalidInput('RUC'),
  }

  static readonly phone: Validator<string> = {
    validationFn: (value) => Patterns.phone.test(value),
    message: invalidInput('número de teléfono'),
  }

  static readonly phonePrefix: Validator<string> = {
    validationFn: (value) => Patterns.phonePrefix.test(value),
    message: invalidInput('prefijo telefónico'),
  }

  static readonly peruPhone: Validator<string> = {
    validationFn: (value) => Patterns.peruPhone.test(value),
    message: invalidInput('teléfono móvil'),
  }

  static readonly zipCode: Validator<string> = {
    validationFn: (value) => Patterns.zipCode.test(value),
    message: invalidInput('código postal'),
  }

  static readonly decimal: Validator<string> = {
    validationFn: (value) => Patterns.decimal.test(value),
    message: invalidInput('número decimal'),
  }

  static readonly email: Validator<string> = {
    validationFn: (value) => Patterns.email.test(value),
    message: invalidInput('email'),
  }

  static fileSize(maxSizeBytes: number): Validator<File | null> {
    return {
      validationFn: (file) => {
        if (file === null) {
          return false
        }
        return file.size > maxSizeBytes
      },
      message: invalidFileSize(maxSizeBytes),
    }
  }

  static minLenght(min: number): Validator<string> {
    return {
      validationFn: (text) => text.length >= min,
      message: `Input must be longer than or equal to ${min} characters`,
    }
  }

  static maxLenght(max: number): Validator<string> {
    return {
      validationFn: (text) => text.length <= max,
      message: `Input must be less than or equal to ${max} characters`,
    }
  }
}

export class Patterns {
  static readonly dni: RegExp = /^\d{8}$/

  static readonly ruc: RegExp = /^[12][0567][0-9]{9}$/

  /**
   * Phone number according to ITU-T E.164
   */
  static readonly phone: RegExp = /^[0-9]{0,14}$/

  static readonly phonePrefix: RegExp = /^[1-9][0-9]{1,2}$/

  static readonly peruPhone: RegExp = /^\d{9}$/

  static readonly zipCode: RegExp = /^\d{5}$/

  /**
   * Decimal number of 0 to 2 fractional digits and 1 to 10 non-fractional digits
   *
   * Example: 10, 15.9, 4958.13
   */
  static readonly decimal: RegExp = /^([0-9]{1,10}\.?[0-9]{0,2}|\.[0-9]{1,2})$/

  // Source: https://emailregex.com/
  static readonly email: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
