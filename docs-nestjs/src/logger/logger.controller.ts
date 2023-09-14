import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';
import { LoggerService } from './logger.service';
import { CreateLoggerDto } from './dto/create-logger.dto';
import { UpdateLoggerDto } from './dto/update-logger.dto';

@Controller('logger')
export class LoggerController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly loggerService: LoggerService,
  ) {}

  @Post()
  create(@Body() createLoggerDto: CreateLoggerDto) {
    return this.loggerService.create(createLoggerDto);
  }

  @Get()
  findAll() {
    this.logger.error('121231', { a: 1, b: 2 });
    return this.loggerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loggerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoggerDto: UpdateLoggerDto) {
    return this.loggerService.update(+id, updateLoggerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loggerService.remove(+id);
  }
}
