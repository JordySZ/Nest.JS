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
  stock: number;

  
  @ManyToOne(() => User, (user) => user.productos, { nullable: true })
  user?: User;

  @JoinTable()
  @ManyToMany(() => SizeEntity,(size)=> size.products)
  sizes:SizeEntity[]
}