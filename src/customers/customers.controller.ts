import { Controller,Get,HttpStatus,Param,Res} from '@nestjs/common';

@Controller('customers')
export class CustomersController {
    @Get(':id')
    find(@Res() response, @Param('id') id: number) {
      if(id < 100) {
        return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
      } else {
        return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
      }
    }
}
