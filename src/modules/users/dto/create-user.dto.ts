import { IsEmail, IsNotEmpty, Matches, Validate } from 'class-validator';
import { CNPJValidator } from 'src/utils/customValidations/cnpj.validation';
import { CPFValidator } from 'src/utils/customValidations/cpf.validation';
import { MessagesHelper } from 'src/utils/helpers/messages.helper';
import { RegExHelper } from 'src/utils/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Validate(CPFValidator)
  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
