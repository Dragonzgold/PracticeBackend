import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  //Y aqui importamos el usersModule para poder usar sus servicios
  imports: [
    UsersModule,
    //Se debe de importar el jwtModule. Que viene en las dependencias que descargamos
    JwtModule.register({
      //Palabra clave global: Que indica que todas las cosas que se encuentren dentro del modulo puedan usar el JWT
      global: true,
      //La palabra secreta (Mas informacion en el jwt.constants)
      secret: jwtConstants.secret,
      //Duracion de la expiracion del token
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
