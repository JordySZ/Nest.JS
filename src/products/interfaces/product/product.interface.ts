import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class Product {
  id: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre no debe contener números.',
  })
  name: string;

  description: string;

}
