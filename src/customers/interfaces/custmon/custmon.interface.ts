import { IsString, IsNotEmpty, Matches,ValidateIf,IsInt, IsDate} from 'class-validator';
import { Type } from 'class-transformer';

export class Custmon {
  id: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'El nombre no debe contener números.',
  })
  name: string;

 @Type(()=> Number)
    @IsString({ message : 'La edad debe ser un numero entero'})
  age: number;


  @Type(()=>Date)
  @IsDate({message:'lafecha de nacimiento de tener frmato AAAA-MM-DD '})
  birthday: Date;
}