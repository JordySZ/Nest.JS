import { Injectable,NotFoundException,HttpException, HttpStatus,BadRequestException} from '@nestjs/common';
import { Product } from './interfaces/product/product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'Vela aromática',
            description: 'Esta vela lanza ricos olores',
          },
          {
            id: 2,
            name: 'Marco de fotos pequeño',
            description: 'Marco ideal para tus fotos 10x15',
          }
        ];
      
        getAll(): Product[] {
          return this.products;
        }
      
        getId(id: number): Product {
          if (isNaN(id)) {
            throw new BadRequestException('El ID debe ser un número');
          }
          const product = this.products.find( (item: Product) => item.id == id);
          if(product) {
            return product;
          } else {
            throw new NotFoundException(`No encontramos el producto ${id}`);
          }
        }
      
        insert(body: Product): void {
          // Verifica si el producto ya existe (ejemplo)
          if (this.products.find(p => p.name === body.name)) {
            throw new BadRequestException(`El producto con nombre "${body.name}" ya existe.`);
          }
      
          this.products = [
            ...this.products,
            {
              id: this.lastId() + 1,
              name: body.name,
              description: body.description,
            },
          ];
        }
      
        update(id: number, body: any) {
          const product = this.products.find( (item: Product) => item.id == id);
          if(product) {
            const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(body.name)) {
    throw new BadRequestException('El nombre solo debe contener letras, sin números ni caracteres especiales.');
  }
            let product: Product = {
              id,
              name: body.name,
              description: body.description,
            }
            this.products = this.products.map( (item: Product) => {
              console.log(item, id, item.id == id);
              return item.id == id ? product : item;
            });
          } else {
            throw new NotFoundException(`No encontramos el producto ${id}`);
          }
        }

      
      
        delete(id: number) {
          const products = this.products.find((item: Product) => item.id == id);
          if(products) {
            this.products = this.products.filter( (item: Product) => item.id != id );
          } else {
            throw new HttpException(`No existe el producto ${id}`, HttpStatus.NOT_FOUND);
          }
        }
      
        private lastId(): number {
          return this.products[this.products.length - 1].id;
        }
      }

