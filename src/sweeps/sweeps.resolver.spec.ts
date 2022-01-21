import { Test, TestingModule } from '@nestjs/testing';
import { SweepsResolver } from './sweeps.resolver';

describe('SweepsResolver', () => {
  let resolver: SweepsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SweepsResolver],
    }).compile();

    resolver = module.get<SweepsResolver>(SweepsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
