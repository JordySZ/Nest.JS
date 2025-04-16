import { IsString, IsNotEmpty, Matches, IsDate,IsInt} from 'class-validator';
import { Type,Transform } from 'class-transformer';
export class CustomersDto {
    
      @IsString()
      @IsNotEmpty()
      @Matches(/^[A-Za-z\s]+$/, {
        message: 'El nombre no debe contener números.',
      })
      name: string;
    
      @Type(() => Number)
      @IsInt({ message: 'La edad debe ser un número entero' })
      age: number;
    
    
      @IsNotEmpty()
      @Transform(({ value }) => {
       
        if (typeof value === 'string') {
          const [day, month, year] = value.split('-');
          return new Date(`${year}-${month}-${day}`);
        }
        return value;
      })
      @IsDate({message:'lafecha de nacimiento de tener frmato AAAA-MM-DD '})
      birthday: Date;

      recidence:string
    }

