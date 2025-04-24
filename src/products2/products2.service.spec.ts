import { Test, TestingModule } from '@nestjs/testing';
import { Products2Service } from './products2.service';

describe('Products2Service', () => {
  let service: Products2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Products2Service],
    }).compile();

    service = module.get<Products2Service>(Products2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
