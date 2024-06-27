import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthPayloadDTO } from './dto/auth.dto';

@ApiTags('Login')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Autentica al usuario' })
  @ApiBody({
    type: AuthPayloadDTO,
    description: 'DTO para la autenticación del usuario',
  })
  @ApiResponse({
    status: 201,
    description: 'Responde con JWT',
  })
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('/status')
  @ApiOperation({ summary: 'Obtiene el estado de autenticación del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Estado de autenticación del usuario',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
