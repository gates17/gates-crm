import { Injectable, Logger, SetMetadata } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { Role } from './role.enum';

/* @Injectable()
export class CatsService {
  constructor(public roleService: UserRoleService) {}

  @UserRole()
  role() {
    return this.roleService.showAll();
  }
}
 */

export const ROLES_KEY = 'roles';
export const UserRole = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/* 
export const CustomDecorator = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {

    const originalMethod = descriptor.value;

    descriptor.value = function () {
      const serviceInstance = this;
      console.log(serviceInstance.myService);

    }

    return descriptor;
  }
};
 */
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
