import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { XxxxService } from './xxxx.service';
import { CreateXxxxDto } from './dto/create-xxxx.dto';
import { UpdateXxxxDto } from './dto/update-xxxx.dto';

@Controller('xxxx')
export class XxxxController {
  constructor(private readonly xxxxService: XxxxService) {}

  @Post()
  create(@Body() createXxxxDto: CreateXxxxDto) {
    return this.xxxxService.create(createXxxxDto);
  }

  @Get()
  findAll() {
    return this.xxxxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xxxxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXxxxDto: UpdateXxxxDto) {
    return this.xxxxService.update(+id, updateXxxxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xxxxService.remove(+id);
  }
}
