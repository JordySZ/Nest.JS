import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Produ } from "src/products2/produc.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  identification: number;

  @OneToMany(() => Produ, (producto) => producto.user) // Relación con Produ
  productos: Produ[]; // Esto es lo que deberías tener para la relación


}