import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskSchedulingDto } from './dto/create-task-scheduling.dto';
import { UpdateTaskSchedulingDto } from './dto/update-task-scheduling.dto';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);
  create(createTaskSchedulingDto: CreateTaskSchedulingDto) {
    return 'This action adds a new taskScheduling';
  }

  findAll() {
    return `This action returns all taskScheduling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskScheduling`;
  }

  update(id: number, updateTaskSchedulingDto: UpdateTaskSchedulingDto) {
    return `This action updates a #${id} taskScheduling`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskScheduling`;
  }
  @Cron('3 * * * * *', {
    name: 'my-cron-job',
  }) // every minute, on the 3th second
  handleCron() {
    this.logger.debug('Called when the current second is 3');
  }
}
