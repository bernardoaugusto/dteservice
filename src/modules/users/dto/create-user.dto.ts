import { IsEmail, IsNotEmpty, Matches, Validate } from 'class-validator';
import { CpfOrCnpjValidator } from 'src/utils/customValidations/cpfOrCnpj.validation copy';
import { MessagesHelper } from 'src/utils/helpers/messages.helper';
import { RegExHelper } from 'src/utils/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Validate(CpfOrCnpjValidator)
  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
