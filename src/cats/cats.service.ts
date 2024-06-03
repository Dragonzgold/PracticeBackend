import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interface/user.activate.interface';
import { Role } from '../common/enum/rol.enum';

@Injectable()
export class CatsService {
  //Creamos primero el contructor
  //InjectamosRepositorio importandolo y lo que se pone entre los parentesis es la funcion de las entidades para poder usarla.
  //Para luego pedirle que lo lea crear una variable y decirle que sea Repository<introducir Nuevamente la funcion de las entidades>. Y luego lo cerramos con llaves
  //Y asi podemos acceder a las diversas funciones de la funcion
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly BreedRepository: Repository<Breed>
  ) { }

  //Gracias aquella linea de codigo podemos trabajar con async y await
  //Funcion para crear
  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {

    const breed = await this.validationBreed(createCatDto.breed)


    const cat = this.catRepository.create({
      ...createCatDto,
      breed: breed,
      userEmail: user.email
    });
    return await this.catRepository.save(cat);
  }

  //Este metodo estaba justamente antes en create. pero se separa y se creo su propio mnetodo
  //La idea es que 
  //Validar que existen las razas
  private async validationBreed(breed: string) {
    //Aqui se crea una nueva constante, se pone el igual para designarle un valor
    //Una vez puesto el igual va el await para usar ahora el repositorio del breed
    //Que seria la tabla que queremos conectar, se buscar con la funciond de
    //findOneBy y se introduce lo demas como se ve en el codigo
    const breedEntity = await this.BreedRepository.findOneBy({ name: breed })
    if (!breedEntity) {
      throw new BadRequestException("No existe dicha raza");
    }
    return breedEntity
  }

  //Buscar todos los gatos
  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return this.catRepository.find()
    }
    return await this.catRepository.find({
      where: { userEmail: user.email },
    }
    );
  }

  //Bsucar un gato
  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id });

    this.validateCat(cat);

    this.validateCatUser(cat, user);

    return cat
  }

  //Actualizar los datos del gato
  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    //return await this.catRepository.update(id, updateCatDto);

    await this.findOne(id, user)

    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validationBreed(updateCatDto.breed) : undefined,
      userEmail: user.email
    })
  }

  //Validar que existe el gato
  private validateCat(cat: Cat) {
    if (!cat) {
      throw new BadRequestException("No se encontro el gato");
    }
  }

  //Validar que el usuario sea el propietario del gato
  private validateCatUser(cat: Cat, user: UserActiveInterface) {
    console.log(user.email);
    console.log(cat.userEmail);
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException('Tu no tienes permiso para ver esta informacion');
    }
  }

  //Eliminar los datos gato
  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ id })//A este se le pasa el ID
    //return await this,catRepository.softRemove({id}) A este se le pasa la instancia
  }
}
