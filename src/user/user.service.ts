import { Injectable,BadRequestException} from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { NotFoundError } from 'rxjs';
import { CreateUserDto } from './userdto';
import { plainToInstance } from 'class-transformer';
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


    async create(userDto: CreateUserDto): Promise<User> {
        try {
          // Verifica que userDto tenga todos los valores esperados
          console.log(userDto);
          
          const user = plainToInstance(User, userDto);
          return await this.userRepository.save(user);
        } catch (error) {
          console.error('Error completo:', error);
          throw new Error('Error creando el usuario: ' + error.message);
        }
      }
}
