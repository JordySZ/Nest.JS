import { Controller, Post,UsePipes,ValidationPipe,Body, Get, Param,Put,Delete,NotFoundException} from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagsService } from './tags.service';
import { Tag } from './tag/tag.interface';
import { get } from 'http';
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService){}
    @Get()
    getAll(): Tag[] {
      return this.tagsService.getAll();
    }
    @Get(':param')
    getByParam(@Param('param') param: string) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(param);
      
      return isUUID
        ? this.tagsService.getId(param)
        : this.tagsService.getBySlug(param);
    }
    
    @Post()
@UsePipes(new ValidationPipe())
post(@Body() body: TagDto): Promise<Tag> {
  return this.tagsService.insert(body);
}
@Put(':id')
async update(@Param('id') id: string, @Body() body: TagDto): Promise<Tag> {
  return this.tagsService.update(id, body);
}

@Delete(':id')
async remove(@Param('id') id: string): Promise<{ message: string }> {
  await this.tagsService.remove(id);
  return { message: `Tag con id ${id} eliminado correctamente` };
}


}

import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.response ?? {};
    const errors = exceptionResponse.message;

    if (status === 406 && Array.isArray(errors)) {
      const formattedErrors = errors.map((error: any) => {
        if (typeof error === 'string') {
          return error;
        }

        const constraints = error?.constraints ?? {};
        const messages = Object.values(constraints).join(', ');
        return error?.property ? `${error.property}: ${messages}` : messages;
      });

      return response.status(status).json({
        statusCode: status,
        message: formattedErrors.join('. '),
      });
    }

    return response.status(status).json({
      statusCode: status,
      message: errors ?? exception.message ?? 'Error inesperado',
    });
  }
}



