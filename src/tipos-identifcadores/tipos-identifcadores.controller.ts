import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { TiposIdentifcadoresService } from './tipos-identifcadores.service';
import { CreateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/create-tipo-identf.dto';
import { UpdateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/update-tipo-identf.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Tipos de identificación')
@ApiBearerAuth()
@Controller('tipos-identificacion')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'TIPOS_IDENTIFICACION')
export class TiposIdentifcadoresController {
  constructor(
    private readonly tiposIdentfService: TiposIdentifcadoresService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los tipos de identificación' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllTiposIdentf() {
    return this.tiposIdentfService.getAllTiposIdentificadores();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un tipo de identificación por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de identificación',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneTiposIdentf(@Param('id') id: number) {
    return this.tiposIdentfService.getOneTiposIdentificadores(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo tipo de identificación' })
  @ApiBody({
    type: CreateTipoIdentfDto,
    description: 'Dto para crear un tipo de identificación',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createTiposIdentf(@Body() createTiposIdentfDto: CreateTipoIdentfDto) {
    const newTipoIndentf =
      await this.tiposIdentfService.createTipoIdentif(createTiposIdentfDto);
    if (newTipoIndentf.success) {
      return { message: 'Tipo de identificación creado', newTipoIndentf };
    } else {
      return { message: newTipoIndentf.message };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un tipo de identificación por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del tipo de identificación',
  })
  @ApiBody({
    type: UpdateTipoIdentfDto,
    description: 'Dto para actualizar un tipo de identificación',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateTiposIdentif(
    @Param('id') id: number,
    @Body() updateTiposIdentfDto: UpdateTipoIdentfDto,
  ) {
    const updateTipoIdentif = await this.tiposIdentfService.updateTipoIdentif(
      id,
      updateTiposIdentfDto,
    );
    if (updateTipoIdentif.success) {
      return {
        message: 'Tipo de identificación actualizado',
        updateTipoIdentif,
      };
    } else {
      return { message: updateTipoIdentif.message };
    }
  }
}
