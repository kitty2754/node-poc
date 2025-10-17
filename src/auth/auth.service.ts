import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';


@Injectable()
export class AuthService {
constructor(private users: UsersService) {}


async register(email: string, password: string, role: Role = Role.USER) {
const existing = await this.users.findByEmail(email);
if (existing) throw new UnauthorizedException('Email already registered');
const passwordHash = await bcrypt.hash(password, 10);
const user = await this.users.create(email, passwordHash, role);
return this.sign(user.id, user.email, user.role);
}


async login(email: string, password: string) {
const user = await this.users.findByEmail(email);
if (!user) throw new UnauthorizedException('Invalid credentials');
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) throw new UnauthorizedException('Invalid credentials');
return this.sign(user.id, user.email, user.role);
}


	private sign(sub: number, email: string, role: Role) {
		const secret = process.env.JWT_SECRET as jwt.Secret;
		const expiresIn = process.env.JWT_EXPIRES_IN ?? '15m';
			// Cast arguments to any to work around typing differences between jsonwebtoken v9 and
			// the installed @types/jsonwebtoken. This is safe for a local dev token generation.
			const token = jwt.sign({ sub, email, role } as any, secret as any, {
				expiresIn,
			} as any);
		return { access_token: token };
	}
}