import { Test, TestingModule } from '@nestjs/testing';
import { TiposIdentifcadoresController } from './tipos-identifcadores.controller';

describe('TiposIdentifcadoresController', () => {
  let controller: TiposIdentifcadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposIdentifcadoresController],
    }).compile();

    controller = module.get<TiposIdentifcadoresController>(TiposIdentifcadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
