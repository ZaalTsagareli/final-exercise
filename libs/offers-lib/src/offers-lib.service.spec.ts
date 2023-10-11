import { Test, TestingModule } from '@nestjs/testing';
import { OffersLibService } from './offers-lib.service';

describe('OffersLibService', () => {
  let service: OffersLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersLibService],
    }).compile();

    service = module.get<OffersLibService>(OffersLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
