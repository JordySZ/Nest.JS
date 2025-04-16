import { Injectable,BadRequestException,NotFoundException,HttpException,HttpStatus} from '@nestjs/common';
import { Custmon } from './interfaces/custmon/custmon.interface';
import { ProductPatchDto } from './dto/customers-patch.dto/customers-patch.dto';
@Injectable()
export class CustomersService {
   private cutmon: Custmon[] = [
          {
              id: 1,
              name: 'Vela aromatica',
              age: 26,
              birthday: new Date('1997-02-06'),
              recidence : "quito"
            },
            {
              id: 2,
              name: 'Marco de fotos pequeño',
              age: 26,
              birthday: new Date('1997-02-06'),
              recidence : "quito"
            }
          ];
           getCuts(): Custmon[] {
                    return this.cutmon;
                  }
                
                  getCustid(id: number): Custmon {
                            if (isNaN(id)) {
                              throw new BadRequestException('El ID debe ser un número');
                            }
                            const cutmon = this.cutmon.find( (item: Custmon) => item.id == id);
                            if(cutmon) {
                              return cutmon;
                            } else {
                              throw new NotFoundException(`No encontramos el custom ${id}`);
                            }
                 }
                  insert(body: any) {
                    if (this.cutmon.find(p => p.name === body.name)) {
                      throw new BadRequestException(`El custom con nombre "${body.name}" ya existe.`);
                    }
                    this.cutmon = [
                      ...this.cutmon,
                      {
                        id: this.lastId() + 1,
                        name: body.name,
                        age: body.age,
                        birthday: body.birthady,
                        recidence: body.recidence
                      }
                    ];
                  }



                  patch(id: number, body: ProductPatchDto) {
                    let previousCustomr = this.getCustid(id);
                    let custmon: Custmon = {
                      ...previousCustomr,
                      ...body
                    }
                    this.cutmon = this.cutmon.map((item: Custmon) => {
                      return item.id == id ? custmon : item;
                    });
                  }

update(id: number, body: any) {
  const product = this.cutmon.find( (item: Custmon) => item.id == id);

  if(product) {
    const nameRegex = /^[A-Za-z\s]+$/;

if (!nameRegex.test(body.name)) {
throw new BadRequestException('El nombre solo debe contener letras y espacios, sin números ni caracteres especiales.');
}

const age = body.age; 

// Verifica si el valor no es un número entero
if (isNaN(age) || age <= 0) {
  throw new BadRequestException('La edad debe ser un número válido y positivo.');
}


          let cutmon: Custmon = {
            id,
            name: body.name,
            age: body.age,
            birthday: body.birthady,
            recidence: body.recidence
          }
          this.cutmon = this.cutmon.map( (item: Custmon) => {
            console.log(item, id, item.id == id);
            return item.id == id ? cutmon : item;
          });
        } else {
          throw new NotFoundException(`No encontramos el custom ${id}`);
        }
        }
  
          delete(id: number) {
            const cutmons = this.cutmon.find((item: Custmon) => item.id == id);
            if(cutmons) {
              this.cutmon = this.cutmon.filter( (item: Custmon) => item.id != id );
            } else {
              throw new HttpException(`No existe el custom ${id}`, HttpStatus.NOT_FOUND);
            }
          }
        
          private lastId(): number {
            return this.cutmon[this.cutmon.length - 1].id;
          }
        
}
