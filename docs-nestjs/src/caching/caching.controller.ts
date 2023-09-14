import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CachingService } from './caching.service';
import { CreateCachingDto } from './dto/create-caching.dto';
import { UpdateCachingDto } from './dto/update-caching.dto';

@Controller('caching')
export class CachingController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cachingService: CachingService,
  ) {}

  @Post()
  create(@Body() createCachingDto: CreateCachingDto) {
    return this.cachingService.create(createCachingDto);
  }

  @Get()
  findAll() {
    return this.cachingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cachingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCachingDto: UpdateCachingDto) {
    return this.cachingService.update(+id, updateCachingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cachingService.remove(+id);
  }
}
