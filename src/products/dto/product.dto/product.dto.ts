import { IsString,IsInt, Matches } from "class-validator";
export class ProductDto {
    id:number;
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre no debe contener números.',
      })
    name: string;
  
    @IsString()
    description: string;
  
    @IsInt()
    stock: number;
}
