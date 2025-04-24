import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Produ } from "src/products2/produc.entity";

@Entity('size')
export class SizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()

  genero: string;

  @Column()
  size_ecuador: string;

  @Column()
  size_usa: string;

  @Column()
  size_ue: string;

  @ManyToMany(() => Produ, (product) => product.sizes)
  products: Produ[];
}