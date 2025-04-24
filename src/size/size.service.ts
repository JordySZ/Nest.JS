import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from './size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async create(size: string): Promise<SizeEntity> {
    const newSize = this.sizeRepository.create({ size });
    return await this.sizeRepository.save(newSize);
  }

  async findAll(): Promise<SizeEntity[]> {
    return await this.sizeRepository.find();
  }
}