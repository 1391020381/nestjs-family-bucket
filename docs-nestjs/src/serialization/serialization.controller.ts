import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SerializationService } from './serialization.service';
import { CreateSerializationDto } from './dto/create-serialization.dto';
import { UpdateSerializationDto } from './dto/update-serialization.dto';
import { UserEntity } from './entities/UserEntity';
import { RoleEntity } from './entities/RoleEntity';
@Controller('serialization')
export class SerializationController {
  constructor(private readonly serializationService: SerializationService) {}

  @Post()
  create(@Body() createSerializationDto: CreateSerializationDto) {
    return this.serializationService.create(createSerializationDto);
  }

  @Get()
  findAll() {
    return this.serializationService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    // return this.serializationService.findOne(+id);
    return new UserEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      password: 'password',
      role: new RoleEntity({ id: 1, name: 'admin' }),
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSerializationDto: UpdateSerializationDto,
  ) {
    return this.serializationService.update(+id, updateSerializationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serializationService.remove(+id);
  }
}
