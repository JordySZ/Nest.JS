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

  // Contar productos por talla
  async countProductsBySize(sizeLabel: string): Promise<number> {
    const count = await this.proRepository
      .createQueryBuilder('produ')
      .leftJoinAndSelect('produ.sizes', 'size')
      .where('size.size_label = :sizeLabel', { sizeLabel })
      .getCount();

    return count;
  }

  // Obtener todos los productos
  async findAll(): Promise<Produ[]> {
    return this.proRepository.find({
      relations: ['user', 'sizes'], // Mostrar usuario y tallas asociadas
    });
  }

  // Obtener un producto por ID
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

  async getProductNamesAndStock(): Promise<{ name: string; stock: number }[]> {
    return await this.proRepository.find({
      select: ['name', 'stock']
    });
  }
  // Crear un nuevo producto
  async create(proDTO: CreadDTO): Promise<Produ> {
    try {
      const user = await this.userRepository.findOneBy({ id: proDTO.userId });
      if (!user) {
        throw new NotFoundException(`Usuario con ID: ${proDTO.userId} no encontrado`);
      }

      let sizes: SizeEntity[] = [];

      // Definir las conversiones para tallas según género
      const conversiones: Record<string, { [key: string]: { usa: string; ecuador: string; ue: string } }> = {
        hombre: {
          XS: { usa: "36", ecuador: "S", ue: "46" },
          S:  { usa: "38", ecuador: "M",  ue: "48" },
          M:  { usa: "40", ecuador: "L",  ue: "50" },
          L:  { usa: "42", ecuador: "XL", ue: "52" },
          XL: { usa: "44", ecuador: "XXL",ue: "54" },
          XXL:{ usa: "46", ecuador: "XXXL",ue: "56" },
        },
        mujer: {
          XS: { usa: "34", ecuador: "XS", ue: "44" },
          S:  { usa: "36", ecuador: "S",  ue: "46" },
          M:  { usa: "38", ecuador: "M",  ue: "48" },
          L:  { usa: "40", ecuador: "L",  ue: "50" },
          XL: { usa: "42", ecuador: "XL", ue: "52" },
          XXL:{ usa: "44", ecuador: "XXL",ue: "54" },
        },
        niño: {
          XS: { usa: "4T", ecuador: "4", ue: "104" },
          S:  { usa: "6",  ecuador: "6", ue: "110" },
          M:  { usa: "8",  ecuador: "8", ue: "116" },
          L:  { usa: "10", ecuador: "10", ue: "122" },
          XL: { usa: "12", ecuador: "12", ue: "128" },
          XXL:{ usa: "14", ecuador: "14", ue: "134" }
        }
      };

      // Validar si se enviaron tallas
      if (proDTO.sizes && proDTO.sizes.length > 0) {
        // Procesar las tallas indicadas
        for (const label of proDTO.sizes) {
          let talla = await this.sizeRepository.findOne({
            where: {
              size_ecuador: label,
              genero: proDTO.genero,
            },
          });

          // Si la talla no existe, la creamos automáticamente
          if (!talla) {
            const valores = conversiones[proDTO.genero]?.[label];

            if (!valores) {
              throw new NotFoundException(`No se puede crear talla desconocida: ${label}`);
            }

            talla = this.sizeRepository.create({
              genero: proDTO.genero,
              size_ecuador: valores.ecuador,
              size_usa: valores.usa,
              size_ue: valores.ue,
            });

            await this.sizeRepository.save(talla);
          }

          sizes.push(talla);
        }
      } else if (proDTO.genero) {
        // Si no se proporcionaron tallas, obtenemos todas las tallas para el género
        sizes = await this.sizeRepository.find({
          where: { genero: proDTO.genero },
        });
      } else {
        throw new NotFoundException('No se ha proporcionado el género o las tallas');
      }

      // Validar si encontramos tallas para el producto
      if (sizes.length === 0) {
        throw new NotFoundException(`No se encontraron tallas para el género: ${proDTO.genero}`);
      }

      // Crear el producto
      const producto = this.proRepository.create({
        name: proDTO.name,
        description: proDTO.description,
        genero: proDTO.genero,
        stock: proDTO.stock,
        user: user,
        sizes: sizes,
      });

      const saved = await this.proRepository.save(producto);

      // Buscar el producto recién creado con sus tallas
      const result = await this.proRepository.findOne({
        where: { id: saved.id },
        relations: ['sizes'],
      });

      if (!result) {
        throw new NotFoundException(`Producto recién creado no encontrado`);
      }

      return result;
    } catch (error) {
      console.error('Error creando el producto:', error);
      throw new Error('Error creando el producto: ' + error.message);
    }
  }

  // Actualizar un producto
  async update(id: number, updateDto: CreadDTO): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    // Convertir etiquetas a entidades de talla
    if (updateDto.sizes) {
      const sizes: SizeEntity[] = [];

      for (const label of updateDto.sizes) {
        const talla = await this.sizeRepository.findOne({
          where: {
            size_ecuador: label,
            genero: updateDto.genero,
          },
        });

        if (!talla) {
          throw new NotFoundException(`Talla con etiqueta "${label}" y género "${updateDto.genero}" no encontrada`);
        }

        sizes.push(talla);
      }

      producto.sizes = sizes;
    }

    const updated = Object.assign(producto, updateDto);
    return await this.proRepository.save(updated);
  }

  // Actualización parcial de un producto
  async patch(id: number, partialDto: Partial<CreadDTO>): Promise<Produ> {
    const producto = await this.proRepository.findOne({
      where: { id },
      relations: ['sizes'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    if (partialDto.sizes !== undefined) {
      if (partialDto.sizes.length === 0) {
        throw new NotFoundException(`No se puede dejar el producto sin tallas`);
      }

      const sizes = await this.sizeRepository.findByIds(partialDto.sizes);
      producto.sizes = sizes;
    }

    const updated = Object.assign(producto, partialDto);
    return await this.proRepository.save(updated);
  }

  // Eliminar un producto
  async remove(id: number): Promise<void> {
    const producto = await this.proRepository.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    await this.proRepository.remove(producto);
  }


}

