import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskSchedulingDto } from './create-task-scheduling.dto';

export class UpdateTaskSchedulingDto extends PartialType(CreateTaskSchedulingDto) {}
