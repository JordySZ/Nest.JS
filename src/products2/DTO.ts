import { Entity } from "typeorm";
import { IsNotEmpty, IsInt, IsArray, IsString } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class CreadDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsInt()
  stock: number;

  @IsInt()
  userId: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number) // <- Esto convierte strings a números automáticamente
  sizes: number[];
}