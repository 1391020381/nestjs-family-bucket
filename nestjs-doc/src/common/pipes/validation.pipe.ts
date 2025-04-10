import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value:', value);
    console.log('metadata:', metadata);
    // 添加类型检查以确保返回值安全
    if (value === undefined || value === null) {
      return undefined;
    }
    return value as unknown;
  }
}
