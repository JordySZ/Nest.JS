import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './tags/tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/users.entity';

@Module({
  imports: [ProductsModule, TagsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'backed',
    entities:[User],
    synchronize: true,
    logging: true,
    autoLoadEntities: true,


  }), UserModule],
  controllers: [AppController, ProductsController, CustomersController],
  providers: [AppService, ProductsService, CustomersService, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})
export class AppModule {}
