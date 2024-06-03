import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../../common/enum/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext,): boolean {
    //Lo que esta dentro de los <>. Le esta diciendo a la funcion que, lo que debe de devolver es un tipo Role que es lo que se encuentra dentro del componente rol.enum.ts
    const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!role) {
      return true;
    }

    //Aqui se hace una desestructuracion del usuario
    const { user } = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) {
      return true
    }

    return role === user.role;
  }
}
