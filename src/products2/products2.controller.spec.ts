import { Test, TestingModule } from '@nestjs/testing';
import { Products2Controller } from './products2.controller';

describe('Products2Controller', () => {
  let controller: Products2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Products2Controller],
    }).compile();

    controller = module.get<Products2Controller>(Products2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
