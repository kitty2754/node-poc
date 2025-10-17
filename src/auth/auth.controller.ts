import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
constructor(private readonly auth: AuthService) {}


@Post('register')
register(@Body() dto: RegisterDto) {
return this.auth.register(dto.email, dto.password, (dto.role as any) ?? 'USER');
}


@Post('login')
login(@Body() dto: LoginDto) {
return this.auth.login(dto.email, dto.password);
}
}