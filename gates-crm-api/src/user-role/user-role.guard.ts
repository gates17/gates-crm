import { UsersService } from './../users/users.service';
import { UsersEntity } from './../users/users.entity';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './user-role.decorator';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}
  async getUserData(user: string) {
    const userData = await this.userService.findByEmail(user);
    return userData.role.role;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    user.roles = await this.getUserData(user.username);

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
