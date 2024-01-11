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
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.user.roles as UserRoleEnum[];

    if (userRoles.includes(UserRoleEnum.ADMIN)) {
      return true;
    }

    return this.hasCommonElement(roles, userRoles);
  }

  private hasCommonElement(array1: string[], array2: string[]): boolean {
    return array1.some((item) => array2.includes(item));
  }
}
