import { Module } from '@nestjs/common';
import { TaskSchedulingService } from './task-scheduling.service';
import { TaskSchedulingController } from './task-scheduling.controller';
import { MyCronJobService } from './MyCronJobService';
@Module({
  controllers: [TaskSchedulingController],
  providers: [TaskSchedulingService, MyCronJobService],
})
export class TaskSchedulingModule {}
