export interface TokenJwtUserInterface {
  id: string;
  name: string;
  email: string;
  roles: UserRoleEnum[];
}

export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
  EMPLOYEE = 'employee',
}
