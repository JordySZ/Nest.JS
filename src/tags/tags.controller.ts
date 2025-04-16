import { Controller, Post,UsePipes,ValidationPipe,Body, Get, Param} from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { TagsService } from './tags.service';
import { Tag } from './tag/tag.interface';
import { get } from 'http';
@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService){}
    @Get('id')
    async find(@Param('id:') id :string){
        console.log(id,typeof id );
    return this.tagsService.getId(id) }
    
    @Post()
@UsePipes(new ValidationPipe())
post(@Body() body: TagDto): Promise<Tag> {
  return this.tagsService.insert(body);
}
}






