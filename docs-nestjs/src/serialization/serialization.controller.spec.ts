import { Test, TestingModule } from '@nestjs/testing';
import { SerializationController } from './serialization.controller';
import { SerializationService } from './serialization.service';

describe('SerializationController', () => {
  let controller: SerializationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SerializationController],
      providers: [SerializationService],
    }).compile();

    controller = module.get<SerializationController>(SerializationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
