import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/decorators/rol/rol.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const getRolMeta = this.reflector.get<string[]>(
      'rol',
      context.getHandler(),
    );

    const req = context.getArgByIndex(0);

    const { roles } = req.user;

    // TODO: Array roles que tiene el usuario ['admin'] DB
    // TODO: Array roles permitidos para este controlador

    const isAllow = roles.some((rol) => getRolMeta.includes(rol));
    return isAllow;
  }
}
