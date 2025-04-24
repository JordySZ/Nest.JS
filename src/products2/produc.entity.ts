import { Column, Entity, PrimaryGeneratedColumn ,ManyToOne} from "typeorm";
import { User } from "src/user/users.entity";
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

}