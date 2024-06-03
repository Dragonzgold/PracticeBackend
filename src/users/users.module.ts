import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  //Exportamos UsersService ya que es lo que nos pide authService. Para eso lo exportamos
  //Segunda parte en authModules
  exports: [UsersService]
})
export class UsersModule { }
