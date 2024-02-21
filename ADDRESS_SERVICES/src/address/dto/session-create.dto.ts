import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { UUID } from "crypto";

export class SessionCreateDTO {

    @IsString()
    @IsNotEmpty()
    cep: string

    @IsString()
    @IsOptional()
    street: string

    @IsString()
    @IsOptional()
    city: string

    @IsString()
    @IsOptional()
    neighborhood: string

    @IsString()
    @IsOptional()
    state: string

    @IsString()
    @IsOptional()
    country: string

    @IsString()
    @IsNotEmpty()
    number: string

    @IsString()
    @IsNotEmpty()
    complement: string
}

