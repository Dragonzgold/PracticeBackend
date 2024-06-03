import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enum/rol.enum";

//Esto nos perimite, tener una mayor control y cuidado en la parte del key a la hora de designar
//los roles de los usuarios. Para evitar el uso de los string. Y tambie va en el apartado de roles.guard.ts
export const ROLES_KEY = 'roles';

//Esto es uns simple funcion flecha. Con la funcion de SetMetadata con 2 parametros, El primero una key
//y el segundo la variable
//El Role que esta despues de los 2 puntos, es el que indica de que tipo debe de ser el role que
//el usuario le esta pasando dentro del sistema. O cual es el que debe de tener para acceder
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);