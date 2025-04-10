import { IsString, IsNotEmpty, Matches,IsDateString,ValidateIf,IsInt} from 'class-validator';

export class Custmon {
  id: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre no debe contener números.',
  })
  name: string;
  @IsInt(
    {
        message: 'La edad no debe contener letras.',}
  )
  age: number;

  birthday: Date;
}