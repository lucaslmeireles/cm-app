import { Test, TestingModule } from '@nestjs/testing';
import { AbsencesService } from './absence.service';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';

describe('AbsencesService', () => {
  let service: AbsencesService;
  let db: Partial<DbService>;
  let ac: Partial<AbilityFactory>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbsencesService,
        { provide: DbService, useValue: db },
        { provide: AbilityFactory, useValue: ac },
      ],
    }).compile();

    service = module.get<AbsencesService>(AbsencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
