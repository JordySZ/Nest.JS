import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }
    async findOne(id:number): Promise<User> {
        const user= await this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundError(`Usuario con ID: ${id} no encontrado`)

        }
       return user;
    }

    async create(user: User): Promise<User> {
        // Validación: asegúrate de que el nombre y el correo no sean nulos
        if (!user.name || !user.email) {
          throw new Error('Name and email are required!');
        }
    
        // Guardamos el usuario en la base de datos
        return this.userRepository.save(user);
      }
}
