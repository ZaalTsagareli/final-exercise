import { Test, TestingModule } from '@nestjs/testing';
import { PatientLibService } from './patient-lib.service';

describe('PatientLibService', () => {
  let service: PatientLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientLibService],
    }).compile();

    service = module.get<PatientLibService>(PatientLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
