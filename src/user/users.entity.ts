import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number; // agregar despues uuidv4

  @Column('varchar', {length:50})
  name: string;

  @Column('varchar', {length:50})
  last_name: string;

  @Column('varchar', {length:50})
  email: string;

  @Column()
  birthadar: Date;

  @Column('int' ,{ width: 10})
  identidication: number;
}