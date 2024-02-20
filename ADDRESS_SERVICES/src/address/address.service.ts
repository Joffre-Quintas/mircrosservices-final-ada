import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SessionCreateDTO } from './dto/session-create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios'

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressByCep(cep: string) {
    const existingAddress = await this.prisma.address.findFirst({
      where: {
        cep: cep,
      },
    });

    if (existingAddress) {
      throw new ConflictException('This zip code is already registered.');
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      throw new NotFoundException('CEP não encontrado.');
    }
  }

  async createAddress({ cep, country = 'Brasil', number, complement }: SessionCreateDTO) {
    const additionalInfo = await this.getAddressByCep(cep);

    const newAddress = await this.prisma.address.create({
      data: {
        cep,
        street: additionalInfo.logradouro,
        city: additionalInfo.localidade,
        neighborhood: additionalInfo.bairro,      
        state: additionalInfo.uf,
        country,
        number,
        complement      
      },
    });

    return newAddress;
  }
}

