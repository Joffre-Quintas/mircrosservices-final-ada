import { Injectable, NotFoundException } from '@nestjs/common';
import { SessionCreateDTO } from './dto/session-create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAddress(cep: string, number: string, complement: string) {
    const existingAddress = await this.prisma.address.findFirst({
      where: {
        cep: cep,
        number: number,
        complement: complement,
      },
    });

    if (existingAddress) {
      return existingAddress;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new NotFoundException('CEP não encontrado.');
    }
  }

  async createAddress({
    cep,
    country = 'Brasil',
    number,
    complement,
  }: SessionCreateDTO) {
    const additionalInfo = await this.getAddress(cep, number, complement);

    if (additionalInfo['id']) {
      return { id: additionalInfo.id };
    }

    const newAddress = await this.prisma.address.create({
      data: {
        cep,
        street: additionalInfo.logradouro,
        city: additionalInfo.localidade,
        neighborhood: additionalInfo.bairro,
        state: additionalInfo.uf,
        country,
        number,
        complement,
      },
    });

    return newAddress;
  }
}
