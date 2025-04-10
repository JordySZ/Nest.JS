import { Controller,Get,HttpStatus,Param,Res,Post,HttpCode,Body,Put,Delete} from '@nestjs/common';
import { Custmon } from './interfaces/custmon/custmon.interface';
import { CustomersService } from './customers.service';
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
    @HttpCode(HttpStatus.NO_CONTENT)
    createProduct(
      @Body() body,
    ) {
      this.customersService.insert(body);
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
//     @Get(':id')
//     find(@Res() response, @Param('id') id: number) {
//       if(id < 100) {
//         return response.status(HttpStatus.OK).send(`Página del producto ${id}`);
//       } else {
//         return response.status(HttpStatus.NOT_FOUND).send(`Producto inexistente`);
//       }
//     }
}
