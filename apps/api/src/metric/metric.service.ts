import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { accessibleBy } from '@casl/prisma';
import { ReqUser } from 'src/types/requser.type';
import { ifEmpty } from 'src/helpers/ifempty';
import { Metric } from '@prisma/client';
import { ResponseType } from 'src/types/response.type';
//TODO REVER MODULO
@Injectable()
export class MetricsService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}
    ability = this.ac.defineAbility;
    async create(createMetricDto: CreateMetricDto, user: ReqUser) {
        return this.db.metric.create({
            data: {
                ...createMetricDto,
                tenant_id: user.tenant_id,
            },
        });
    }

    async findAll(user: ReqUser): Promise<ResponseType<Metric[]>> {
        try {
            const data = await this.db.metric.findMany({
                where: accessibleBy(this.ability(user)).Metric,
            });
            ifEmpty(data);
            return {
                statusCode: 200,
                message: 'Metrics fetched with success',
                data: data,
            };
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findOne(id: string, user: ReqUser) {
        try {
            const data = await this.db.metric.findFirst({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Metric],
                },
            });
            ifEmpty(data);
            return data;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async update(id: string, updateMetricDto: UpdateMetricDto, user: ReqUser) {
        try {
            const data = await this.db.metric.update({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Metric],
                },
                data: updateMetricDto,
            });
            ifEmpty(data);
            return data;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async remove(id: string, user: ReqUser) {
        try {
            const data = await this.db.metric.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Metric],
                },
            });
            ifEmpty(data);
            return data;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async findMetricsFromEmployee(id: string, user: ReqUser) {
        try {
            const data = await this.db.metric.findMany({
                where: {
                    grade: {
                        every: {
                            employee_id: id,
                        },
                    },
                    AND: [accessibleBy(this.ability(user)).Metric],
                },
            });
            ifEmpty(data);
            return data;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }
}
