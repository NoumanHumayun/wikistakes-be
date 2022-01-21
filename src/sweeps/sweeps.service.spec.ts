import { Test, TestingModule } from '@nestjs/testing';
import { SweepsService } from './sweeps.service';

describe('SweepsService', () => {
  let service: SweepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SweepsService],
    }).compile();

    service = module.get<SweepsService>(SweepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
