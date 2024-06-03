import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enum/rol.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

//Este es el componente donde podemos poner varios decoradores a la vez. En este ejemplo estamos poniendo 2
//Y es tal y como se muestra en el ejemplo de abajo. Sin usar sus @ y especificando tambien los parametros que estos deben de tener para realizar sus funciones
//Y lo que se importa es lo que esta a la izquierda de la function

export function Auth(role: Role) {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard),
    )
}