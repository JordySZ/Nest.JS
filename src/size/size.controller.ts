import { Controller, Get, Delete, Param } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeEntity } from './size.entity';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  // Obtener todas las tallas
  @Get()
  async getAllSizes(): Promise<SizeEntity[]> {
    return this.sizeService.findAll();
  }

  // Eliminar una talla por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.sizeService.remove(id); // Llama al servicio para eliminar la talla
  }
}