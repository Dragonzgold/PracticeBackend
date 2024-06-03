import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    //Esto sucede cuando dos modulos dependan de uno al otro. Ejemplo, modulo a depende de b y modulo b depende de a
    //A eso se le dicxe dependencia circular. Y la forma de hacer que no nos salga error es colocando lo de abajo
    forwardRef(()=> AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  //Exportamos UsersService ya que es lo que nos pide authService. Para eso lo exportamos
  //Segunda parte en authModules
  exports: [UsersService]
})
export class UsersModule { }
