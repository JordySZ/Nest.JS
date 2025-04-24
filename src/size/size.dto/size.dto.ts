import { IsString } from 'class-validator';

export class SizeDto {
  @IsString()
  size: string; // Talla, por ejemplo, "S", "M", "L", etc.
}