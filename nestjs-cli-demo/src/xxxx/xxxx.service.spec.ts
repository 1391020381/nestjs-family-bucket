import { Test, TestingModule } from '@nestjs/testing';
import { XxxxService } from './xxxx.service';

describe('XxxxService', () => {
  let service: XxxxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XxxxService],
    }).compile();

    service = module.get<XxxxService>(XxxxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
