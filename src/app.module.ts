import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposIdentifcadoresModule } from './tipos-identifcadores/tipos-identifcadores.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './constans/constans';
import { AuthModule } from './auth/auth.module';

import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';

import { RolesModule } from './roles/roles.module';
import { RolesUsuarioModule } from './roles_usuario/roles_usuario.module';
import { RolesMenusModule } from './roles_menus/roles_menus.module';
import { MenusService } from './menus/menus.service';
import { MenusController } from './menus/menus.controller';
import { MenusModule } from './menus/menus.module';
import { PermisosController } from './permisos/permisos.controller';
import { PermisosService } from './permisos/permisos.service';
import { PermisosModule } from './permisos/permisos.module';
import { RolesMenusPermisosController } from './roles_menus_permisos/roles_menus_permisos.controller';
import { RolesMenusPermisosModule } from './roles_menus_permisos/roles_menus_permisos.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>(DATABASE_HOST), // Cambia esto a tu host de PostgreSQL
        port: parseInt(config.get<string>(DATABASE_PORT), 10), // Puerto de PostgreSQL
        username: config.get<string>(DATABASE_USERNAME), // Cambia esto a tu usuario de Postgr eSQL
        password: config.get<string>(DATABASE_PASSWORD), // Cambia esto a tu contraseña de PostgreSQL
        database: config.get<string>(DATABASE_NAME), // Cambia esto a tu base de datos de PostgreSQL
        entities: [__dirname + '/**/**/*entity{.ts,.js}'],
        synchronize: false,
      }),
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    TiposIdentifcadoresModule,
    AuthModule,

    ProductosModule,
    CategoriasModule,
    MarcasModule,

    RolesModule,
    RolesUsuarioModule,
    MenusModule,
    RolesMenusModule,
    PermisosModule,
    RolesMenusPermisosModule,
  ],
  controllers: [AppController, MenusController, PermisosController, RolesMenusPermisosController],
  providers: [AppService, MenusService, PermisosService],
})
export class AppModule {}
