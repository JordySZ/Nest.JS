import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import {v4 as uuidv4} from 'uuid'
import { Tag } from './tag/tag.interface';

@Injectable()
export class TagsService {
    private tags: Tag[] = [];

    getAll(): Tag[] {
        return this.tags;
      }

    getId(id:string): Tag {
        const tag = this.tags.find(tags => tags.id === id);
if(!tag){
    
  throw new NotFoundException(`Tag con id ${id} no encontrado`); 
}
return tag
    }


    async insert(tagDto : TagDto): Promise<Tag>{
        const existingTag = this.tags.find(tag => tag.slug === tagDto.slug);
        if (existingTag) {
          throw new NotFoundException(`Ya existe un tag con el slug '${tagDto.slug}'`);
        }
         if (this.tags.find(p => p.name === tagDto.name)) {
                    throw new BadRequestException(`El producto con nombre "${tagDto.name}" ya existe.`);
                  }
        const tag :Tag = {
            id: uuidv4(),
            name: tagDto.name,
            description:tagDto.description,
            slug: tagDto.slug,
            stock: tagDto.stock
        }

        this.tags.push(tag);
        return tag
    }

 


      async update(id: string, tagDto: TagDto): Promise<Tag> {
        const index = this.tags.findIndex(tag => tag.id === id);
      
        if (index === -1) {
          throw new NotFoundException(`Tag con id ${id} no encontrado`);
        }
      
        const updatedTag: Tag = {
          ...this.tags[index],
          ...tagDto,
          id, // Aseguramos que el ID no cambie
        };
      
        this.tags[index] = updatedTag;
        return updatedTag;
      }

      async remove(id: string): Promise<void> {
        const index = this.tags.findIndex(tag => tag.id === id);
      
        if (index === -1) {
          throw new NotFoundException(`Tag con id ${id} no encontrado`);
        }
      
        this.tags.splice(index, 1); // Elimina el tag del array
      }

      getBySlug(slug: string): Tag {
        const tag = this.tags.find(tag => tag.slug === slug);
        if (!tag) {
          throw new NotFoundException(`Tag con slug '${slug}' no encontrado`);
        }
        return tag;
      }
}
