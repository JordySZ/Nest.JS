import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CustomersController],
  providers: [AppService, ProductsService, CustomersService],
})
export class AppModule {}
