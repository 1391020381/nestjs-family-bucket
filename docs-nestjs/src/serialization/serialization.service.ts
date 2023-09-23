import { Injectable } from '@nestjs/common';
import { CreateSerializationDto } from './dto/create-serialization.dto';
import { UpdateSerializationDto } from './dto/update-serialization.dto';

@Injectable()
export class SerializationService {
  create(createSerializationDto: CreateSerializationDto) {
    return 'This action adds a new serialization';
  }

  findAll() {
    return `This action returns all serialization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serialization`;
  }

  update(id: number, updateSerializationDto: UpdateSerializationDto) {
    return `This action updates a #${id} serialization`;
  }

  remove(id: number) {
    return `This action removes a #${id} serialization`;
  }
}
