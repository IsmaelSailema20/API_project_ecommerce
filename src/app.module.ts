import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from './constans/constans';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposIdentifcadoresModule } from './tipos-identifcadores/tipos-identifcadores.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { MarcasModule } from './marcas/marcas.module';
import { RolesModule } from './roles/roles.module';
import { RolesUsuarioModule } from './roles_usuario/roles_usuario.module';
import { RolMenuModule } from './roles_menus/rol_menu.module';
import { MenuModule } from './menus/menu.module';
import { PermisoModule } from './permisos/permiso.module';
import { RolMenuPermisoModule } from './roles_menus_permisos/rol_menu_permiso.module';

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
        // logging: true,
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
    MenuModule,
    RolMenuModule,
    PermisoModule,
    RolMenuPermisoModule,
  ],
})
export class AppModule {}
