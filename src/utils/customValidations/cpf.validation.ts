/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { RegExHelper } from '../helpers/regex.helper';

@ValidatorConstraint({ name: 'CPFValidator', async: false })
@Injectable()
export class CPFValidator implements ValidatorConstraintInterface {
  public async validate(value: string) {
    var sum = 0;
    var rest = 0;

    const digitsOnly = /^\d{11}$/.test(value);
    const validFormat = RegExHelper.cpf.test(value);

    const isValid = digitsOnly || validFormat;

    if (!isValid) return false;

    var strCPF = String(value).replace(/[^\d]/g, '');

    if (
      [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
      ].indexOf(strCPF) !== -1
    )
      return false;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;

    if (rest != parseInt(strCPF.substring(9, 10))) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;

    if (rest != parseInt(strCPF.substring(10, 11))) return false;

    return true;
  }

  public defaultMessage() {
    return MessagesHelper.CPF_INVALID;
  }
}
