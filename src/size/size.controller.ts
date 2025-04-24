import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from './size.entity'; // Ajustá el path si es distinto

@Controller('size')
export class SizeController {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  @Post()
  createSize(@Body() body: { size: string }) {
    return this.sizeRepository.save({ size: body.size });
  }
}
