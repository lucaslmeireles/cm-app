import { Test, TestingModule } from '@nestjs/testing';
import { FormationsController } from './formation.controller';
import { FormationsService } from './formation.service';

describe('FormationsController', () => {
  let controller: FormationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationsController],
      providers: [FormationsService],
    }).compile();

    controller = module.get<FormationsController>(FormationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
