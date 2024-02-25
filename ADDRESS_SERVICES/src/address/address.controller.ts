import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { SessionCreateDTO } from './dto/session-create.dto';

@Controller('/')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/create-address')
  async create(
    @Body()
    {
      cep,
      street,
      city,
      neighborhood,
      state,
      country,
      number,
      complement,
    }: SessionCreateDTO,
  ) {
    try {
      const newAddress = await this.addressService.createAddress({
        cep,
        street,
        city,
        neighborhood,
        state,
        country,
        number,
        complement,
      });
      return newAddress;
    } catch (error) {
      throw error;
    }
  }
  @Post('/get-address')
  async getAddress(@Body() { cep, number, complement }: SessionCreateDTO) {
    try {
      const address = await this.addressService.getAddress(
        cep,
        number,
        complement,
      );
      return address.id;
    } catch (error) {
      throw error;
    }
  }
}
