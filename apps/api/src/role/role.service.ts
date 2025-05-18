import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class RoleService {
    constructor(private db: DbService) {}

    async getRoles() {
        const roles = await this.db.role.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return roles;
    }
}
