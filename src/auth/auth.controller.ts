import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Registerdto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enum/rol.enum';
import { Auth } from './decorator/auth.decorators';
import { ActiveUser } from 'src/common/decorators/activeUserDecorator';
import { UserActiveInterface } from 'src/common/interface/user.activate.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authservice: AuthService) { }

    @Post('register')
    register(@Body() payloadDto: Registerdto) {
        return this.authservice.register(payloadDto)
    }

    @Post('login')
    login(@Body() payloadDto: LoginDto) {
        return this.authservice.login(payloadDto)
    }

    @Get('profile')
    //El @UseGuards es algo que lo trae ya por defecto el @nestjs/common. Mientras que el
    //AuthGurad fue lo que generamos en la consola. Y es lo que se encuentra dentro del archivo
    //auth.guard.ts
    @UseGuards(AuthGuard, RolesGuard)
    //Este es un decorador que nosotros mismos hemos creado y que se encuentra en decorator roles.decorator.ts
    //No traemos ese export y lo usamos
    //Dato curioso. Esto puede ser un array, para poner mas roles ejemplo:
    //['admin', 'superAdmin']
    //El Role que esta dentro de los parentesis es el que se exporto del componente role.enum.ts
    //Y es el que nos permite saber cuales roles pueden ecceder a ese apartado
    @Roles(Role.USER)

    //Aqui se dejo un espacio de más, para poder explicar esto de mejor manera
    //La linea de codigo que esta abajo es un decorador que se encuentra en la carpeta decorator
    //Y el cual estadentro del archivo auth.decorators.ts
    //Este decorador lo que nos permite es, poder tener varios decoradores en 1 solo. Es decir,
    //Podemos tener el decorador @Roles() y @UseGuards dentro del decorador @Auth a la vez
    //Para mayor informacion vaya al componente donde se encuentra dicha informacion
    //@Auth(Role.ADMIN)
    profile(@ActiveUser() user: UserActiveInterface) {
        return this.authservice.profile(user);
    }
    //Y esto tiene aun mas texto PTM. Bueno, se crea una nueva carpeta llama decorators y adentro va
    //el activeUser esto nos permite agarrar el request de una forma mas limpia y ordenada
    //Para que no se vea tan desastrozo el codigo. Se exporta de esa carpeta y se coloca a dentro
    //de los parentesis de la ruta con parentesis, luego a lado de eso se pone el payload que es lo que
    //se necesita para agarrar los datos del ususario. Posteriormente van 2 puntos 
    //Y se extrae el UserActiveInterface, que es otro componente que nosotrso creamos y se encuentra
    //dentro de la carpeta interface. Esto permite comparar los datos que se estan pasando y ver si son los indicados
    //Para acceder a dicha ruta
}
