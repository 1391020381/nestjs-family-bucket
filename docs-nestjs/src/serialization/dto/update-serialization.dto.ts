import { PartialType } from '@nestjs/mapped-types';
import { CreateSerializationDto } from './create-serialization.dto';

export class UpdateSerializationDto extends PartialType(
  CreateSerializationDto,
) {}
