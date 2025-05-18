import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DbService } from 'src/db/db.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private db: DbService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`,
        });
    }

    async validate(payload: any) {
        console.log(payload, 'validate');
        try {
            const user = await this.db.user.findFirst({
                where: {
                    id: payload.id,
                },
                include: {
                    role: {
                        select: {
                            name: true,
                        },
                    },
                    employee: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            if (!user) {
                throw new Error('User not found');
            }

            const payload_data = {
                user: payload.id || user.id,
                username: payload.username || user.email,
                role: user.role.name,
                tenant_id: user.tenant_id || payload.tenant_id,
                active: user.active || payload.active,
                employee_id: user.employee.id || payload.employee_id,
                name: user.employee.name || payload.name,
            };
            console.log(payload_data, 'payload_data');
            return payload_data;
        } catch (e) {
            throw new Error('User not found');
        }
    }
}
