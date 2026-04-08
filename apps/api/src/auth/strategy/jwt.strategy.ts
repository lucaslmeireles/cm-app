import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { DbService } from 'src/db/db.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
//TODO : Add redis cache to store user data and reduce db calls
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private db: DbService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    try {
      const cachedUser = await this.cacheManager.get(`user_${payload.id}`);
      if (cachedUser) {
        console.log('User data retrieved from cache');
        return cachedUser;
      }
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
      await this.cacheManager.set(`user_${payload_data.user}`, payload_data);
      return payload_data;
    } catch (e) {
      console.log(e, 'error');
      throw new Error('User not found');
    }
  }
}
