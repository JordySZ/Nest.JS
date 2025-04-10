import { Injectable } from '@nestjs/common';
import { Custmon } from './interfaces/custmon/custmon.interface';
@Injectable()
export class CustomersService {
   private cutmon: Custmon[] = [
          {
              id: 1,
              name: 'Vela aromática',
              age: 26,
              birthady: new Date('1997-02-06')
            },
            {
              id: 2,
              name: 'Marco de fotos pequeño',
              age: 26,
              birthady: new Date('1997-02-06')
            }
          ];
           getCuts(): Custmon[] {
                    return this.cutmon;
                  }
                
                  getCustid(id: number): Custmon  | undefined {
                    return this.cutmon.find( (item: Custmon) => item.id == id);
                  }
                
                  insert(body: any) {
                    this.cutmon = [
                      ...this.cutmon,
                      {
                        id: this.lastId() + 1,
                        name: body.name,
                        age: body.age,
                        birthady: body.birthady
                      }
                    ];
                  }
update(id: number, body: any) {
          let cutmon: Custmon = {
            id,
            name: body.name,
            age: body.age,
            birthady: body.birthady
          }
          this.cutmon = this.cutmon.map( (item: Custmon) => {
            console.log(item, id, item.id == id);
            return item.id == id ? cutmon : item;
          });
        }
  delete(id: number) {
          this.cutmon = this.cutmon.filter( (item: Custmon) => item.id != id );
        }
                  private lastId(): number {
                    return this.cutmon[this.cutmon.length - 1].id;
                  }
}
