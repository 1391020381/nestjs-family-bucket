import { Test, TestingModule } from '@nestjs/testing';
import { SerializationService } from './serialization.service';

describe('SerializationService', () => {
  let service: SerializationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SerializationService],
    }).compile();

    service = module.get<SerializationService>(SerializationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
