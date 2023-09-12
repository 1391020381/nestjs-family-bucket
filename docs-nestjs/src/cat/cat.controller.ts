import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Req,
  Res,
  Ip,
  HostParam,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get('breed')
  @Header('Cache-Control', 'none')
  @Header('AAAA', '1')
  @HttpCode(500)
  findAll(@Req() req: Request, @Ip() ip, @HostParam() hostParam) {
    // console.log(req.headers);
    // console.log('ip:', ip, 'hostParam:', hostParam);
    return this.catService.findAll();
  }
  @Get('ab*cd')
  routeWildcards() {
    return 'this route uses a wildcard';
  }
  // @Get(':id')
  // findOne(@Param('id') id: string, @Res() res: Response) {
  //   // return this.catService.findOne(+id);
  //   res.status(HttpStatus.BAD_GATEWAY).send(this.catService.findOne(+id));
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
