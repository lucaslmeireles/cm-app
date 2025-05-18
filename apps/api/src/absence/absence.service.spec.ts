import { Test, TestingModule } from '@nestjs/testing';
import { AbsencesService } from './absence.service';

describe('AbsencesService', () => {
  let service: AbsencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbsencesService],
    }).compile();

    service = module.get<AbsencesService>(AbsencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
