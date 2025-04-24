import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from './size.entity';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  // Obtener todas las tallas
  async findAll(): Promise<SizeEntity[]> {
    return await this.sizeRepository.find(); 
  }

  // Eliminar una talla por ID
  async remove(id: number): Promise<void> {
    const talla = await this.sizeRepository.findOne({ where: { id } });

    if (!talla) {
      throw new NotFoundException(`Talla con ID: ${id} no encontrada`);
    }

    await this.sizeRepository.remove(talla); // Eliminar la talla de la base de datos
  }
}