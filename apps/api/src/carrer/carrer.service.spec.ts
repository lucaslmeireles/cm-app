import { Test, TestingModule } from '@nestjs/testing';
import { CarrersService } from './carrer.service';

describe('CarrersService', () => {
  let service: CarrersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarrersService],
    }).compile();

    service = module.get<CarrersService>(CarrersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
