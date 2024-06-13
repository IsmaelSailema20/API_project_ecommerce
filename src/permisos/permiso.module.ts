import { Module } from '@nestjs/common';
import { PermisoController } from './permiso.controller';

@Module({
  controllers: [PermisoController],
})
export class PermisoModule {}
