import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Breed } from './entities/breed.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreedsService {

  constructor(
    @InjectRepository(Breed)
    private readonly BreedRepository: Repository<Breed>
  ) { }

  async create(createBreedDto: CreateBreedDto) {
    const breedNew = this.BreedRepository.create(createBreedDto);
    return await this.BreedRepository.save(breedNew);
  }

  async findAll() {
    return await this.BreedRepository.find();
  }

  async findOne(id: number) {
    return await this.BreedRepository.findBy({ id });
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    return await `This action updates a #${id} breed`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} breed`;
  }
}
