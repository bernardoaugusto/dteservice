/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MessagesHelper } from '../helpers/messages.helper';
import { CpfValidator } from './cpf.validation';
import { CnpjValidator } from './cnpj.validation';

@ValidatorConstraint({ name: 'CpfOrCnpjValidator', async: false })
@Injectable()
export class CpfOrCnpjValidator implements ValidatorConstraintInterface {
  public async validate(value: string) {
    const isCpf = new CpfValidator().validate(value);
    const isCnpj = new CnpjValidator().validate(value);

    return isCpf || isCnpj;
  }

  public defaultMessage() {
    return MessagesHelper.CPF_OR_CNPJ_INVALID;
  }
}
