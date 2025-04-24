import { Module } from '@nestjs/common';
import { Products2Service } from './products2.service';
import { Products2Controller } from './products2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produ } from './produc.entity';
import { User } from 'src/user/users.entity';
import { SizeEntity } from 'src/size/size.entity';
@Module({
    imports: [TypeOrmModule.forFeature([Produ,User,SizeEntity])],
  providers: [Products2Service],
  controllers: [Products2Controller],
  exports: [Products2Service],
})
export class Products2Module {}
