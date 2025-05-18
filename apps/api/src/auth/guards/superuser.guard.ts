import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

  @Injectable()
  export class SuperUserGuard implements CanActivate {
    constructor(
      private reflector: Reflector,
      private userService: UserService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const hasSuperUser = await this.userService.findSuperUser()
      if (!hasSuperUser) {
        throw new ForbiddenException('SuperUser not created')
      }
      return true
    }
  }