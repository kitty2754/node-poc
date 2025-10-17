import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';


@Injectable()
export class UsersService {
constructor(private prisma: PrismaService) {}


findByEmail(email: string) {
return this.prisma.user.findUnique({ where: { email } });
}


create(email: string, passwordHash: string, role: Role = Role.USER) {
	return this.prisma.user.create({ data: { email, passwordHash, role } });
}
}