import { PartialType } from '@nestjs/mapped-types';
import { CustomersDto } from '../customers.dto/customers.dto';

export class ProductPatchDto extends PartialType(CustomersDto) { }