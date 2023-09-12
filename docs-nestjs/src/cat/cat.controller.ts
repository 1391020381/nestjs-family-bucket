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
  HttpException,
  UseFilters,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CatService } from './cat.service';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
// import { UpdateCatDto } from './dto/update-cat.dto';
import { CustomException } from '../common/CustomException';
import { CustomExceptionFilter } from '../common/CustomExceptionFilter';
import { ValidationPipe } from '../common/validation.pipe';
import { ZodValidationPipe } from '../common/ZodValidationPipe';
@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get('breed')
  @UseFilters(new CustomExceptionFilter())
  @Header('Cache-Control', 'none')
  @Header('AAAA', '1')
  @HttpCode(500)
  findAll(@Req() req: Request, @Ip() ip, @HostParam() hostParam) {
    // console.log(req.headers);
    // console.log('ip:', ip, 'hostParam:', hostParam);
    // return this.catService.findAll();
    throw new CustomException('CustomException', 500);
  }
  // @Get('ab*cd')
  // async routeWildcards() {
  //   try {
  //     await Window;
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: 'This is a custom message',
  //         code: '500',
  //       },
  //       HttpStatus.BAD_GATEWAY,
  //       {
  //         cause: error,
  //       },
  //     );
  //   }
  // }
  @Get(':id')
  findOne(@Param('id', ValidationPipe) id: string, @Res() res: Response) {
    // return this.catService.findOne(+id);
    console.log('id:', id, typeof id);
    res.status(HttpStatus.BAD_GATEWAY).send(this.catService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
