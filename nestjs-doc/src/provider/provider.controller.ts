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
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Connection } from './provider.module';

@Controller('provider')
export class ProviderController {
  @Inject('CONNECTION')
  private readonly connection2: typeof Connection;
  constructor(
    private readonly providerService: ProviderService,
    @Inject('CONNECTION') private readonly connection1: typeof Connection,
  ) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providerService.create(createProviderDto);
  }

  @Get()
  findAll() {
    // return this.providerService.findAll();
    return this.connection1.getRepository().find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.providerService.findOne(+id);
    return this.connection2.getRepository(id).find();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providerService.update(+id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providerService.remove(+id);
  }
}
