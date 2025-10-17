import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';


export class RegisterDto {
@IsEmail() email!: string;
@IsString() @MinLength(6) password!: string;
@IsOptional() @IsString() role?: 'USER' | 'ADMIN';
}


export class LoginDto {
@IsEmail() email!: string;
@IsString() password!: string;
}