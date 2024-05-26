import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('tipos_identificacion')
export class TiposIdentificacionEntity {
  @PrimaryGeneratedColumn()
  id_tipo_identificacion: number;

  @Column({ name: 'nombre', length: 20, unique: true })
  nombre: string;

  @Column({ name: 'estado', length: 4 })
  estado: string;
}
