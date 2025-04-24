import { Entity } from "typeorm";
import { IsNotEmpty,IsInt} from "class-validator";
@Entity()
export class CreadDTO {
   @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    description: string;
  
    @IsInt()
    stock:number

    @IsInt()
    userId: number;

}