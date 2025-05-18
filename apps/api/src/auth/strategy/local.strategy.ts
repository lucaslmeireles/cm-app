import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const { data } = await this.authService.validateUser(username, password);
    console.log('data', data);
    if (!data) {
      throw new UnauthorizedException('Wrong credentials');
    }
    if (data.role_id !== 'SuperUser' && data.active === true) {
      return {
        id: data.id,
        role: data.role_id,
        tenant_id: data.tenant_id,
        org: data.org.id,
        active: data.active,
      };
    }

    const payload = {
      id: data.id,
      role: data.role_id,
      tenant_id: data.tenant_id,
      org: data.org.id,
      active: data.active,
      employee_id: data.employee !== null ? data.employee.id : null,
      employee_name: data.employee !== null ? data.employee.name : null,
    };
    return payload;
  }
}
