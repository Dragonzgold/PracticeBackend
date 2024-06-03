import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
//Aqui estamos importando Role que son los parametros que queremos que tenga nuestra app
import { Role } from 'src/common/enum/rol.enum';
//importamos el decorador que nos trae los guard
import { Auth } from 'src/auth/decorator/auth.decorators';
import { ActiveUser } from 'src/common/decorators/activeUserDecorator';
import { UserActiveInterface } from 'src/common/interface/user.activate.interface';

//Aqui estamos diciendo que para poder acceder a esta funcion. Deben de tener un usuario para poder
//acceder a ella. Para poder aceder a todas las funciones
@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  create(@Body() createCatDto: CreateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.create(createCatDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.catsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.update(+id, updateCatDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.catsService.remove(+id, user);
  }
}
