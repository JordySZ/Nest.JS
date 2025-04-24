import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";
import { Produ } from "src/products2/produc.entity";

@Entity('size')
export class SizeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string;

  @ManyToMany(() => Produ, (product) => product.sizes)
  @JoinTable() // Solo si esta es la entidad dueña de la relación
  products: Produ[];
}