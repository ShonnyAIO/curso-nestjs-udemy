import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const getRolMeta = this.reflector.get<string[]>('rol', context.getHandler());
    console.log('___', getRolMeta);

    const req = context.getArgByIndex(0);
    const {roles} = req.user;

    // TODO: Array roles que tiene el usuario ['admin'] DB
    // TODO: Array roles permitidos para este controlador

    const isAllow = roles.includes(getRolMeta);
    return isAllow;
  }
}
