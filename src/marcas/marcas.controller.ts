import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { CreateMarcasDto } from './dtos/create-marcas.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMarcasDto } from './dtos/update-marcas.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';

@ApiTags('Marcas')
@Controller('marcas')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'MARCAS')
export class MarcasController {
  constructor(private readonly marcasServices: MarcasService) {}

  @Get()
  async getAllMarcas() {
    return this.marcasServices.getAllMarcas();
  }
  @Get(':id')
  async getOneMarca(@Param('id') id: number) {
    return this.marcasServices.getOneMarca(id);
  }

  @Post()
  async createMarcas(@Body() createMarcasDto: CreateMarcasDto) {
    const newMarca = await this.marcasServices.createMarca(createMarcasDto);
    if (newMarca.success) {
      return { message: 'La marca fue creada con exito', newMarca };
    } else {
      return { message: newMarca.message };
    }
  }

  @Put(':id')
  async updateMarca(
    @Param('id') id: number,
    @Body() updateMarcaDto: UpdateMarcasDto,
  ) {
    const updateMarca = await this.marcasServices.updateMarca(
      id,
      updateMarcaDto,
    );
    if (updateMarca.success) {
      return { message: 'La marca ha sido actualizada con exito', updateMarca };
    } else {
      return { message: updateMarca.message };
    }
  }
}
