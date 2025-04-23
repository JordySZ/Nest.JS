import { Body, Controller,Get, Param, ParseIntPipe,Post,ValidationPipe } from '@nestjs/common';
import { User } from './users.entity';
import { UserService } from './user.service';
import { create } from 'domain';
import { CreateUserDto } from './userdto';
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    findAll():Promise<User[]>{
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id',ParseIntPipe)id:number): Promise<User>
{
    return this.userService.findOne(id);
    
}
@Post()
create(@Body(new ValidationPipe()) user: CreateUserDto): Promise<User> {
  console.log(user);  // Verifica que los datos sean correctos
  return this.userService.create(user);
}
}

