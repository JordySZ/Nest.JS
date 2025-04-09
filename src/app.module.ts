import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CustomersController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
