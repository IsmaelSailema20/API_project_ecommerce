import { Test, TestingModule } from '@nestjs/testing';
import { TiposIdentifcadoresService } from './tipos-identifcadores.service';

describe('TiposIdentifcadoresService', () => {
  let service: TiposIdentifcadoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposIdentifcadoresService],
    }).compile();

    service = module.get<TiposIdentifcadoresService>(TiposIdentifcadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
