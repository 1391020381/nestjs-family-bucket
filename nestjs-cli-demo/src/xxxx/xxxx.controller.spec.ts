import { Test, TestingModule } from '@nestjs/testing';
import { XxxxController } from './xxxx.controller';
import { XxxxService } from './xxxx.service';

describe('XxxxController', () => {
  let controller: XxxxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XxxxController],
      providers: [XxxxService],
    }).compile();

    controller = module.get<XxxxController>(XxxxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
