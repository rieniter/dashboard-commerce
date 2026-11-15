import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength, } from 'class-validator'
import { NewUser } from "../../../database/schema/schema.js";

export class CreateUserDto implements Omit<NewUser, 'id' | 'createdAt'> {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    passwordHash: string;

    @IsString()
    @MaxLength(255)
    firstName: string | null;

    @IsString()
    @MaxLength(255)
    lastName: string | null;

    @IsOptional()
    @IsDateString()
    birthDate?: string | null;

    @IsOptional()
    @IsUrl()
    @MaxLength(500)
    image?: string | null;
}
