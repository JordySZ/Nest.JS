import { Controller,Get,HttpStatus,Param,Res,Post,HttpCode,Body,Put,Delete,Patch,Query,ParseIntPipe,BadRequestException,ValidationPipe} from '@nestjs/common';
import { Custmon } from './interfaces/custmon/custmon.interface';
import { CustomersService } from './customers.service';
import { ProductPatchDto } from './dto/customers-patch.dto/customers-patch.dto';
@Controller('customers')
export class CustomersController {


constructor(private readonly customersService: CustomersService) { }
    @Get()
    getAllProducts(): Custmon[] {
      return this.customersService.getCuts();
    }
  
    @Get(':id')
    find(@Param('id') id: number) {
      return this.customersService.getCustid(id);
    }
  
    @Post()
        @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
        async createProduct(@Body(new ValidationPipe()) body: Custmon): Promise<void> {
          // Validación de producto duplicado antes de insertarlo
          try {
            // Verificamos si el producto ya existe en el servicio
            await this.customersService.insert(body);
          } catch (error) {
            // Si el producto ya existe, se lanza un error 
            throw new BadRequestException(`Error al agregar el producto: ${error.message}`);
          }
        }

   @Put(':id')
    update(
      @Param('id') id: number, 
      @Body() body,
    ) {
      return this.customersService.update(id, body);
    }
   @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number) {
      this.customersService.delete(id);
    }

    @Patch(':id')
    async patch(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: ProductPatchDto,
    ) {
      return this.customersService.patch(id, body);
    }
//control
     @Get('ini/hello')
        getHelloInProducts(): string {
          return "Estamos en custmon!!!";
        }
        @Get('ini2/hot')
      getSpecialProducts(): string {
        return "Te vamos a mostrar los productos más calientes!!";
      }
      @Get('selec/:id')
      finde( @Param() params) {
        return `Estás consultando el custom ${params.id}`;
      }
      
      @Get('con/:id/:size')
      findWithSize(@Param('id') id: number, @Param('size') size: string ) {
        return `Página de detalle de custom ${id}, en tamaño ${size}`;
      }
      
      @Post('creat')
      
      createProductt(
        @Body('name') name: string, 
        @Body('age') age: string,
        @Body('birthady') birthady: string
      ) {
        return `su nombre es ${name} con edad ${age} y cumple años el ${birthady}.`;
      }
      
     
      @Get('error/ruta-error-404')
      @HttpCode(HttpStatus.NOT_FOUND)
      rutaConError404() {
        return 'Esto es un error 404!!';
      }
      
      @Put('act/:id')
      updatee(@Param('id') id: number, @Body() body) {
        return `Estás haciendo una operación de actualización del custom ${id} 
                con ${body.name} y ${body.description}`;
      }
      @Patch('pac/:id')
      partialUpdate(@Param('id') id: number, @Body() body) {
        return `Actualización parcial del ítem ${id}`;
      }
      
      @Delete('del/:id')
      @HttpCode(HttpStatus.NO_CONTENT)
      deleteT(@Param('id') id: number): void {
        console.log(`Hemos borrado el custom ${id}`);
      }
      
      
      
          @Get('con/:id')
          findi(@Res() response, @Param('id') id: number) {
            if(id < 100) {
              return response.status(HttpStatus.OK).send(`Página del custom ${id}`);
            } else {
              return response.status(HttpStatus.NOT_FOUND).send(`Custom inexistente`);
            }
          }
      
      
      @Get('que/query')
      rutaQuery(@Query() query) {
          return `El dato query.x ha recibido el valor ${query.x}`;
      }
      @Get('car/cars')
      carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return carCount;
      }
}
