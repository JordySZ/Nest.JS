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

}