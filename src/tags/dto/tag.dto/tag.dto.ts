import { IsString, Matches, MaxLength, MinLength,IsInt} from "class-validator";

export class TagDto {
    @IsString()
    @MaxLength(30)
    @MinLength(0, {message: 'No se puede enviar basio',})
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'El nombre no debe contener números ni caracteres especiales.',
      })
      name: string;

      @IsString()
      @MaxLength(100)
      @MinLength(0, {message: 'No se puede enviar basio',})
      @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'El nombre no debe contener números ni caracteres especiales.',
      })
      description:string;

      @IsString()
      @MinLength(0, {message: 'No se puede enviar basio',})
      @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, {
        message: 'El nombre no debe contener números ni caracteres especiales.',
      })
      slug?: string;

      @IsInt({message: 'El stock debe ser un numero entero',})
      @MinLength(0, {message: 'No se puede enviar basio',})
      stock: number





}
