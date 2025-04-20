import { IsString, Matches, MaxLength, MinLength,IsInt,IsNotEmpty} from "class-validator";

export class TagDto {
    @IsString()
    @MaxLength(30)
    @MinLength(0, {message: 'No se puede enviar basio',})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'name: El nombre no debe contener números ni caracteres especiales.',
      })
      name: string;

      @IsString()
      @MaxLength(100)
      @MinLength(0, {message: 'No se puede enviar basio',})
      @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'description: La description no debe contener números ni caracteres especiales.',
      })
      description:string;

      @IsString()
      @Matches(/^[A-Za-z0-9-]+$/, {
        message: 'lug: El slug solo debe contener letras, números y guiones.',
      })
      slug?: string;
      
      @IsNotEmpty({message: 'No se puede enviarr basio',})
      @IsInt({message: 'stock: El stock debe ser un numero entero',})
    
      stock: number





}
