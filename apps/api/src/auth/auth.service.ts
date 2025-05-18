import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthService {
    constructor(
        private UserSevice: UserService,
        private JwtService: JwtService,
        private db: DbService,
    ) {}

    async validateUser(username: string, password: string) {
        try {
            const user = await this.UserSevice.findUser(username);
            if (!user) {
                return null;
            }
            if (user && (await bcrypt.compare(password, user.data.password))) {
                delete user.data.password;
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log('Error validating user:', error);
            return null;
        }
    }

    async login(user: {
        id: string;
        email: string;
        role: string;
        tenant_id: number;
        name: string;
        profile_pic: string;
        active: boolean;
        employee_id?: string;
        employee_name?: string;
    }) {
        const payload = {
            username: user.email,
            id: user.id,
            role: user.role,
            tenant_id: user.tenant_id,
            name: user.name ? user.name : '',
            profile_pic: user.profile_pic ? user.profile_pic : '',
            active: user.active,
            employee_id: user.employee_id ? user.employee_id : '',
            employee_name: user.employee_name ? user.employee_name : '',
        };
        const token = {
            ...payload,
            token: {
                access_token: this.JwtService.sign(payload, {
                    expiresIn: '1h',
                }),
                expiresIn: Date.now() + 60 * 60,
                refresh_token: this.JwtService.sign(payload, {
                    expiresIn: '7d',
                }),
            },
        };
        return token;
    }

    async refreshToken(user: {
        user: string;
        username: string;
        role: string;
        tenant_id: number;
        name: string;
        org: string;
        profile_pic: string;
        active: boolean;
        employee_id?: string;
        employee_name?: string;
    }) {
        const payload = {
            username: user.username,
            id: user.user,
            role: user.role,
            tenant_id: user.tenant_id,
            name: user.name ? user.name : '',
            profile_pic: user.profile_pic ? user.profile_pic : '',
            active: user.active,
            employee_id: user.employee_id ? user.employee_id : '',
            employee_name: user.employee_name ? user.employee_name : '',
        };
        const token = {
            ...payload,
            access_token: this.JwtService.sign(payload, { expiresIn: '2h' }),
            expiresIn: Date.now() + 60 * 60 * 2 * 1000,
            refresh_token: this.JwtService.sign(payload, { expiresIn: '7d' }),
        };
        return token;
    }
}
