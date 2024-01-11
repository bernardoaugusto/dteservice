import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../auth.interface';

export const Roles = (roles: UserRoleEnum[]) => SetMetadata('roles', roles);
