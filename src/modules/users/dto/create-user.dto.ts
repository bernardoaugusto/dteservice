import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { CpfOrCnpjValidator } from 'src/utils/customValidations/cpfOrCnpj.validation copy';
import { MessagesHelper } from 'src/utils/helpers/messages.helper';
import { RegExHelper } from 'src/utils/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Validate(CpfOrCnpjValidator)
  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
