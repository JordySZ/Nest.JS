import { Column, Entity, PrimaryGeneratedColumn ,ManyToOne, JoinTable, ManyToMany} from "typeorm";
import { User } from "src/user/users.entity";
import { SizeEntity } from "src/size/size.entity";
@Entity()
export class Produ {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  genero: string;

  @Column()
  stock: number;

  @ManyToMany(() => SizeEntity, (size) => size.products)
  @JoinTable() // Necesario para establecer la relación de muchos a muchos
  sizes: SizeEntity[];  // La relación con las tallas
}