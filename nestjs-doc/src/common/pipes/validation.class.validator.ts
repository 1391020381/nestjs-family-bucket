import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value as unknown;
    }
    const object = plainToInstance(metatype, value) as object;
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }
    return object;
  }
  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: Array<{ new (...args: any[]): any }> = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
