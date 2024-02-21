import { BadRequestException, Body, Controller, Get, Post, createParamDecorator } from '@nestjs/common';
import { AddressService } from './address.service';
import { SessionCreateDTO } from './dto/session-create.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() { cep, street, city, neighborhood, state, country, number, complement }: SessionCreateDTO) {
    try {
      const newAddress = await this.addressService.createAddress({ cep, street, city, neighborhood, state, country, number, complement });
      return newAddress;
    } catch (error) {
      throw error;
    }
  }
}

