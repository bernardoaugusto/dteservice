import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoleEnum } from '../auth.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user.roles;

    if (userRoles.includes(UserRoleEnum.ADMIN)) {
      return true;
    }

    return this.hasCommonElement(roles, userRoles);
  }

  private hasCommonElement(
    array1: UserRoleEnum[],
    array2: UserRoleEnum[],
  ): boolean {
    return array1.some((item) => array2.includes(item));
  }
}
