import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants/jwt.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  //Y aqui importamos el usersModule para poder usar sus servicios
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '1d' }
      }),
      inject: [ConfigService],
    }),


//Todo eso se comento para seguir con el tutorial. Se podria decir que todo lo que esta abajo es la primera parte
//Pero luego se debera actualizar por lo que esta arriba
//Simplemente se deja para tener una guia. Pero primero se hace lo que esta abajo
//Y luego muta con lo que esta arriba


    //Se debe de importar el jwtModule. Que viene en las dependencias que descargamos
    // JwtModule.register({
    //   //Palabra clave global: Que indica que todas las cosas que se encuentren dentro del modulo puedan usar el JWT
    //   global: true,
    //   //La palabra secreta (Mas informacion en el jwt.constants)
    //   secret: jwtConstants.secret,
    //   //Duracion de la expiracion del token
    //   signOptions: { expiresIn: '1d' }
    // })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  //Lo que estamos exportando es el modulo del token que se encuentra arriba
  exports: [JwtModule]
})
export class AuthModule { }
