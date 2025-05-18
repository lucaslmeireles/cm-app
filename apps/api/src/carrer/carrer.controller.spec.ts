import { Test, TestingModule } from '@nestjs/testing';
import { CarrersController } from './carrer.controller';
import { CarrersService } from './carrer.service';

describe('CarrersController', () => {
  let controller: CarrersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarrersController],
      providers: [CarrersService],
    }).compile();

    controller = module.get<CarrersController>(CarrersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
