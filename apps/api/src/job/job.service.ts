import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { accessibleBy } from '@casl/prisma';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { ifEmpty } from 'src/helpers/ifempty';
//TODO REVER MODULO
//TODO doc e repensar
@Injectable()
export class JobsService {
    constructor(
        private db: DbService,
        private ac: AbilityFactory,
    ) {}

    ability = this.ac.defineAbility;
    async createJob(user: ReqUser, dto: CreateJobDto) {
        const newJob = await this.db.job.create({
            data: {
                name: dto.name,
                type: dto.type,
                tenant_id: user.tenant_id,
                metrics: {
                    connect: dto.metric_id.map((id) => {
                        return { id: id };
                    }),
                },
                department: {
                    connect: dto.department_id.map((id) => {
                        return {
                            id: id,
                        };
                    }),
                },
            },
        });
        return newJob;
    }

    async getAllJobs(user: ReqUser) {
        const jobs = await this.db.job.findMany({
            where: accessibleBy(this.ability(user)).Job,
            include: {
                _count: true,
            },
        });
        return jobs;
    }

    async getJobById(user: ReqUser, id: string) {
        try {
            const job = await this.db.job.findUnique({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Job],
                },
                include: {
                    department: true,
                    metrics: {
                        select: {
                            name: true,
                            type: true,
                            id: true,
                        },
                    },
                    org: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            ifEmpty(job);
            return job;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }

    async updateJob(user: ReqUser, dto: UpdateJobDto, id: string) {
        console.log(dto, id);
        const newJob = await this.db.job.update({
            where: {
                id,
            },
            data: {
                name: dto.name,
                type: dto.type,
                tenant_id: user.tenant_id,
                metrics: {
                    connect: dto.metric_id.map((id) => {
                        return { id: id };
                    }),
                },
                department: {
                    set: dto.department_id.map((id) => {
                        return {
                            id: id,
                        };
                    }),
                },
            },
        });
        return newJob;
    }

    async deleteJobById(user: ReqUser, id: string) {
        try {
            const job = await this.db.job.delete({
                where: {
                    id,
                    AND: [accessibleBy(this.ability(user)).Job],
                },
            });
            ifEmpty(job);
            return job;
        } catch (e) {
            throw new ForbiddenException(e.message);
        }
    }
}
