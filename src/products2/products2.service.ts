import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Produ } from './produc.entity';
import { CreadDTO } from './DTO';
import { User } from 'src/user/users.entity';
import { SizeEntity } from 'src/size/size.entity';

@Injectable()
export class Products2Service {
  constructor(
    @InjectRepository(Produ)
    private proRepository: Repository<Produ>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(SizeEntity)
    private sizeRepository: Repository<SizeEntity>,
  ) {}

  async findAll(): Promise<Produ[]> {
    return this.proRepository.find({
      relations: ['user', 'sizes'], // Mostrar usuario y tallas asociadas
    });
  }

  async findOne(id: number): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['user', 'sizes'], // Mostrar usuario y tallas
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    return producto;
  }

  async create(proDTO: CreadDTO): Promise<Produ> {
    try {
      const user = await this.userRepository.findOneBy({ id: proDTO.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID: ${proDTO.userId} no encontrado`);
      }

      const sizes = await this.sizeRepository.findByIds(proDTO.sizes || []);

      const producto = this.proRepository.create({
        name: proDTO.name,
        description: proDTO.description,
        stock: proDTO.stock,
        user: user,
        sizes: sizes,
      });

      return await this.proRepository.save(producto);
    } catch (error) {
      console.error('Error creando el producto:', error);
      throw new Error('Error creando el producto: ' + error.message);
    }
  }

  async update(id: number, updateDto: CreadDTO): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    if (updateDto.userId) {
      const user = await this.userRepository.findOneBy({ id: updateDto.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID: ${updateDto.userId} no encontrado`);
      }
      producto.user = user;
    }

    if (updateDto.sizes) {
      const sizes = await this.sizeRepository.findByIds(updateDto.sizes);
      producto.sizes = sizes;
    }

    const updated = Object.assign(producto, updateDto);
    return await this.proRepository.save(updated);
  }

  async patch(id: number, partialDto: Partial<CreadDTO>): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    if (partialDto.userId) {
      const user = await this.userRepository.findOneBy({ id: partialDto.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID: ${partialDto.userId} no encontrado`);
      }
      producto.user = user;
    }

    if (partialDto.sizes) {
      const sizes = await this.sizeRepository.findByIds(partialDto.sizes);
      producto.sizes = sizes;
    }

    const updated = Object.assign(producto, partialDto);
    return await this.proRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.proRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    await this.proRepository.remove(producto);
  }
}
