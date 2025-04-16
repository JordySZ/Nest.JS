import { Controller,Get,Param,Post,Body,HttpCode, HttpStatus,Res,Put,Patch,Delete,Query,ParseIntPipe,BadRequestException,ValidationPipe} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product/product.interface';
import { ProductDto } from './dto/product.dto/product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }
    @Get()
    getAllProducts(): Product[] {
      return this.productsService.getAll();
    }
  
    @Get(':id')
    find(@Param('id') id: number) {
      return this.productsService.getId(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
    async createProduct(@Body(new ValidationPipe()) body: Product): Promise<void> {
      // Validación de producto duplicado antes de insertarlo
      try {
        // Verificamos si el producto ya existe en el servicio
        await this.productsService.insert(body);
      } catch (error) {
        // Si el producto ya existe, se lanza un error 
        throw new BadRequestException(`Error al agregar el producto: ${error.message}`);
      }
    }
  
  
    @Put(':id')
    updatel(
      @Param('id') id: number, 
      @Body() body,
    ) {
      return this.productsService.update(id, body);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: number) {
      this.productsService.delete(id);
    }
  
    //controlll

    @Get('ini/hello')
    getHelloInProducts(): string {
      return "Estamos en productos!!!";
    }
    @Get('ini2/hot')
  getSpecialProducts(): string {
    return "Te vamos a mostrar los productos más calientes!!";
  }
  @Get('selec/:id')
  finde( @Param() params) {
    return `Estás consultando el producto ${params.id}`;
  }
  
  @Get('con/:id/:size')
  findWithSize(@Param('id') id: number, @Param('size') size: string ) {
    return `Página de detalle de producto ${id}, en tamaño ${size}`;
  }
  
  // @Post('creat')
  // createProductt(
  //   @Body('name') name: string, 
  //   @Body('description') description: string
  // ) {
  //   return `Creo el producto ${name} con descripción ${description}.`;
  // }
  
  // @Post('creat')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // createProducct(
  //   @Body() productDto: ProductDto,
  // ) {
  //   this.productsService.insert(productDto);
  // }
 
  @Post('creat')
createProduc( @Body() productDto: ProductDto ) {
  this.productsService.insert(productDto);
}

  @Get('error/ruta-error-404')
  @HttpCode(HttpStatus.NOT_FOUND)
  rutaConError404() {
    return 'Esto es un error 404!!';
  }
  
  @Put('act/:id')
  update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() body) {
    return `Estás haciendo una operación de actualización del recurso ${id} 
            con ${body.name} y ${body.description}`;
  }
  @Patch('pac/:id')
  partialUpdate(@Param('id') id: number, @Body() body) {
    return `Actualización parcial del ítem ${id}`;
  }
  
  @Delete('del/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteT(@Param('id') id: number): void {
    console.log(`Hemos borrado el producto ${id}`);
  }
  
  

      @Get('con/:id')
      findi(@Res() response, @Param('id',ParseIntPipe) id: number) {
        if(id < 100) {
          return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
        } else {
          return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
        }
      }
  
    //http://localhost:3000/products/que/query?x=24&y=xxx
  @Get('que/query')
  rutaQuery(@Query() query) {
      return `El dato query.x ha recibido el valor ${query.x}`;
  }

  //http://localhost:3000/products/car/cars?count=3
  @Get('car/cars')
  carsQuery(@Query('count', ParseIntPipe) carCount: number) {
    return carCount;
  }
}
