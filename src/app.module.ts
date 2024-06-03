import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedsModule } from './breeds/breeds.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    //Esto se acaba de instalar con el comando de: yarn add @nestjs/config -SE
    ConfigModule.forRoot({
      isGlobal: true,
    }),


    //Esta e sla configuracion para poder conectarlos a la base de datos
    //Y esta informacion se debe de completar con la que pusimos en el docker-compose
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      //Esta linea de codigo debemos de colocar todas las entitites de manera manual
      //entities: []
      //Mientras que, con esta se caragran automaticamente todas las entitdades que encuentre
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CatsModule,
    BreedsModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
