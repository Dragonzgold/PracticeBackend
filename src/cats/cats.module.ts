import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { BreedsModule } from 'src/breeds/breeds.module';
import { BreedsService } from 'src/breeds/breeds.service';


@Module({
  //Aqui estamos importando lo que hicimos en el aparatado de entities
  //La parte de forFeatures, nos permite cargar y/o subir los array de las entidades a la BD
  //Y lo que tenemos que poner entre las llaves y corchetes es la variable que se encuentra en entities
  imports: [TypeOrmModule.forFeature([Cat]), BreedsModule],
  controllers: [CatsController],
  providers: [CatsService, BreedsService],
})
export class CatsModule { }
