import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }

    cleanDb() {
        return this.$transaction([this.user.deleteMany({})]);
    }
}
