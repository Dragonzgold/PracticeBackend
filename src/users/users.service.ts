import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }

  //Algo interesante. Colocando el findOne, nos permite buscar de manera mas robusta y/o especificar
  //Que es lo que queremos buscar. Con eso indicamos con "where" que es el email
  //Para posteriormente seleccionarlo con select los datos que queremos traer 
  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'role', `password`]
    })
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const deleteUser = await this.userRepository.softDelete({ id })

    console.log(deleteUser);

    return `Usted a eliminado al usuario ${deleteUser} con exito`
  }
}
