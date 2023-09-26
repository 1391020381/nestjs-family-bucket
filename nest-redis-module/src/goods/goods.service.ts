import { Injectable, Inject } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { RedisService } from 'src/redis/redis.service';
@Injectable()
export class GoodsService {
  @Inject(RedisService)
  private readonly redisService: RedisService;
  async getHello() {
    const value = await this.redisService.get('a');
    return `Hello World! ${value}`;
  }
  create(createGoodDto: CreateGoodDto) {
    return 'This action adds a new good';
  }

  findAll() {
    return `This action returns all goods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
