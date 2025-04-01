import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ControllerService } from './controller.service';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { Request } from 'express';

@Controller('controller')
export class ControllerController {
  constructor(private readonly controllerService: ControllerService) {}

  @Post()
  @HttpCode(500)
  create(@Body() createControllerDto: CreateControllerDto) {
    console.log(createControllerDto);
    return createControllerDto; // this.controllerService.create(createControllerDto);
  }

  @Get()
  findAll(@Req() request: Request): { [key: string]: any } {
    const { query } = request;
    if (query) {
      return query;
    }
    return { data: this.controllerService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.controllerService.findOne(+id);
  }
  @Get('abc/*path')
  findOneByName(@Param('path') path: string) {
    return path; // /controller/abc/123 => 123
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateControllerDto: UpdateControllerDto,
  ) {
    return this.controllerService.update(+id, updateControllerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.controllerService.remove(+id);
  }
}
