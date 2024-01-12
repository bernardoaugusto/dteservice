/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { RegExHelper } from '../helpers/regex.helper';

@ValidatorConstraint({ name: 'CnpjValidator', async: false })
@Injectable()
export class CnpjValidator implements ValidatorConstraintInterface {
  public validate(value: string) {
    if (!value) return false;

    const isString = typeof value === 'string';
    const validTypes =
      isString || Number.isInteger(value) || Array.isArray(value);

    if (!validTypes) return false;

    if (isString) {
      const digitsOnly = /^\d{14}$/.test(value);
      const validFormat = RegExHelper.cnpj.test(value);
      const isValid = digitsOnly || validFormat;

      if (!isValid) return false;
    }

    const numbers = this.matchNumbers(value);

    if (numbers.length !== 14) return false;

    const items = [...new Set(numbers)];
    if (items.length === 1) return false;

    const digits = numbers.slice(12);

    const digit0 = this.validCalc(12, numbers);
    if (digit0 !== digits[0]) return false;

    const digit1 = this.validCalc(13, numbers);
    return digit1 === digits[1];
  }

  private validCalc(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  }

  public defaultMessage() {
    return MessagesHelper.CNPJ_INVALID;
  }

  private matchNumbers(value: string | number | number[] = '') {
    const match = value.toString().match(/\d/g);
    return Array.isArray(match) ? match.map(Number) : [];
  }
}
