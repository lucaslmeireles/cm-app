import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`,
        });
    }

    async validate(payload: any) {
        console.log(payload);
        try {
            const payload_data = {
                user: payload.id,
                username: payload.username,
                role: payload.role,
                tenant_id: payload.tenant_id,
                active: payload.active,
                profile_pic: payload.profile_pic,
                org: payload.org,
            };
            console.log(payload_data, 'retorna refresh');
            return payload_data;
        } catch (e) {
            throw new Error('User not found');
        }
    }
}
