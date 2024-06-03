import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    //El mismo JwtService que usamos en auth.service.ts
    private readonly jwtService: JwtService
  ) {}

  //Este metodo se ejecuta antes de que se procese una solicitud hacia una ruta o un endpoint especifico
  //Esto se ejecutaria antes de cualquier peticion (que involucre auth. Supongo), para poder autorizar y verificar si el token que le estamos enviando es valido. Si es valido lo dejamos pasar por la ruta
  //Si es true le dara acceso y si es false no le dara acceso
  async canActivate(context: ExecutionContext): Promise<boolean> {

    //Esta variable request. Permite agarrar lo que el usuario manda por el metodo post. Para poder usarlo aqui mismo, basicamente es como un capturador
    const request = context.switchToHttp().getRequest();

    //Permite ver si hay un token en la consola
    //console.log(request.headers.authorization); <= linea de codigo para ver el token en consola

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Tu no estas autorizado para acceder a esta zona');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      //request.user = payload;
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('No estas autorizado para ver la siguiente informacion');
    }

    return true;
  }

  //Con este metodo estamos extrayendo el token del header
  //Nota, el Requeste que esta depues de los 2 puntos se debe de importar de express
  //Pero no te lo dice. Mas sin embargo hay que importarlo
  private extractTokenFromHeader(request: Request) {


    //Okey lo que hace aqui es separarlo en 2 partes. El split hace que, cuando haya un espacio se separe en 2 array. Cuestion de que, lo primero que encuentre antes del espacio sera el tipo (type) y lo segundo sera el token (toke). Por eso esta en split

    //Si no se le envia nada se usa el signo de "?" para evitar que explote el programa y envia ambas variables en undefained. tanto el type como el token. ya que ambos esperan una respuesta valida. 
    //Y en el return se muestra que el type espera ser tipo "Bearer" y si no lo es pues se lanza como undefained
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
