import { Injectable } from '@nestjs/common';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';

@Injectable()
export class ControllerService {
  create(createControllerDto: CreateControllerDto) {
    return 'This action adds a new controller';
  }

  findAll() {
    return `This action returns all controller`;
  }

  async findOne(id: number) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          msg: `This action returns a #${id} controller`,
          data: {
            id,
            name: '张三',
            age: 18,
          },
        });
      });
    });
  }

  update(id: number, updateControllerDto: UpdateControllerDto) {
    return `This action updates a #${id} controller`;
  }

  remove(id: number) {
    return `This action removes a #${id} controller`;
  }
}
