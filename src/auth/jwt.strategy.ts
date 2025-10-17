import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	// passport-jwt expects secretOrKey as string | Buffer
	secretOrKey: process.env.JWT_SECRET as string,
ignoreExpiration: false,
});
}
async validate(payload: any) {
// attach to req.user
return { sub: payload.sub, email: payload.email, role: payload.role };
}
}