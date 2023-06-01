import { Injectable } from '@nestjs/common';
import { CreateXxxxDto } from './dto/create-xxxx.dto';
import { UpdateXxxxDto } from './dto/update-xxxx.dto';

@Injectable()
export class XxxxService {
  create(createXxxxDto: CreateXxxxDto) {
    return 'This action adds a new xxxx';
  }

  findAll() {
    return `This action returns all xxxx`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xxxx`;
  }

  update(id: number, updateXxxxDto: UpdateXxxxDto) {
    return `This action updates a #${id} xxxx`;
  }

  remove(id: number) {
    return `This action removes a #${id} xxxx`;
  }
}
