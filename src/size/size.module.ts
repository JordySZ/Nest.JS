import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeEntity } from './size.entity';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { Produ } from 'src/products2/produc.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SizeEntity,Produ])], // Asegúrate de incluir esto
  providers: [SizeService],
  controllers: [SizeController],
})
export class SizeModule {}