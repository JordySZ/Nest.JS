import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produ } from './produc.entity';
import { CreadDTO } from './DTO';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/users.entity';

@Injectable()
export class Products2Service {
  constructor(
    @InjectRepository(Produ)
    private proRepository: Repository<Produ>,

    @InjectRepository(User)
    private userRepository: Repository<User>, // Nuevo: también inyectamos User
  ) {}

  findAll(): Promise<Produ[]> {
    return this.proRepository.find({
      relations: ['user'], // Opcional: si quieres que al listar productos también salga el user
    });
  }

  async findOne(id: number): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['user'], // Opcional: traer el usuario asociado
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }
    return producto;
  }

  async create(proDTO: CreadDTO): Promise<Produ> {
    try {
      console.log(proDTO);

      const user = await this.userRepository.findOneBy({ id: proDTO.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID: ${proDTO.userId} no encontrado`);
      }

      const producto = this.proRepository.create({
        name: proDTO.name,
        description: proDTO.description,
        stock: proDTO.stock,
        user: user, // Asociar el producto al usuario
      });

      return await this.proRepository.save(producto);
    } catch (error) {
      console.error('Error completo:', error);
      throw new Error('Error creando el producto: ' + error.message);
    }
  }

  async update(id: number, updateDto: CreadDTO): Promise<Produ> {
    const producto = await this.proRepository.findOneBy({ id });
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

    const updated = Object.assign(producto, updateDto);
    return await this.proRepository.save(updated);
  }

  async patch(id: number, partialDto: Partial<CreadDTO>): Promise<Produ> {
    const producto = await this.proRepository.findOneBy({ id });
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
