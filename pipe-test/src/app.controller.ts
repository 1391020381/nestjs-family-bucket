import {
  Controller,
  Get,
  Body,
  Query,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaPipe } from './aaa.pipe';
import { Ooo } from './dto/ooo.dto';
import { MyValidationPipe } from './my-validation-pipe';
enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('xxx' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: string,
  ): string {
    // return this.appService.getHello();
    return aa + 1;
  }

  @Get('ee')
  ee(@Query('ee', new ParseArrayPipe({ items: Number })) ee: Array<number>) {
    return ee.reduce((total, item) => total + item, 0);
  }
  @Get('ff')
  ff(
    @Query(
      'ff',
      new ParseArrayPipe({
        separator: '..',
        optional: true,
      }),
    )
    ff: Array<string>,
  ) {
    return ff;
  }
  @Get('gg/:enum')
  gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }
  @Get('hh/:uuid')
  hh(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }

  @Get('kkk')
  kkk(@Query('kkk', new DefaultValuePipe('aaa')) kkk: string) {
    return kkk;
  }
  @Get('nnn/:bbb')
  nnn(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }
  @Post('ooo')
  ooo(@Body(new ValidationPipe()) obj: Ooo) {
    return obj;
  }
  @Post('customValidate')
  validate(@Body(new MyValidationPipe()) obj: Ooo) {
    return obj;
  }
}
