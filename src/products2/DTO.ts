import { Entity } from "typeorm";
import { IsNotEmpty, IsInt, IsArray, IsString,ArrayNotEmpty,Min } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class CreadDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  genero: string;

  @IsInt()
  userId: number;
  
  @IsInt()
  @Min(0)  // Valida que stock sea un número entero positivo o 0
  stock: number;

  @IsArray()
  @ArrayNotEmpty()
  sizes: string[];  // Cambiado a string[] para aceptar etiquetas como "M", "L", etc.

 
}