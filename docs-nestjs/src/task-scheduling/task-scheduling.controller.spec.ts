import { Test, TestingModule } from '@nestjs/testing';
import { TaskSchedulingController } from './task-scheduling.controller';
import { TaskSchedulingService } from './task-scheduling.service';

describe('TaskSchedulingController', () => {
  let controller: TaskSchedulingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskSchedulingController],
      providers: [TaskSchedulingService],
    }).compile();

    controller = module.get<TaskSchedulingController>(TaskSchedulingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
