import { PartialType } from '@nestjs/mapped-types';
import { CreateXxxxDto } from './create-xxxx.dto';

export class UpdateXxxxDto extends PartialType(CreateXxxxDto) {}
