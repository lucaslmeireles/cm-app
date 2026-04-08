import { Test, TestingModule } from '@nestjs/testing';
import { EducationsController } from './education.controller';
import { EducationsService } from './education.service';

describe('EducationsController', () => {
  let controller: EducationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationsController],
      providers: [EducationsService],
    }).compile();

    controller = module.get<EducationsController>(EducationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
