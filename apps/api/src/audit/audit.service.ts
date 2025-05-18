import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ResourceType } from '@prisma/client';

@Injectable()
export class AuditService {
    constructor(private db: DbService) {}

    async createAuditLog({
        resourceType,
        resourceId,
        action,
        changes,
        tenantId,
        userId,
    }: {
        resourceType: ResourceType;
        resourceId: string;
        action: 'CREATE' | 'UPDATE' | 'DELETE';
        changes?: any;
        tenantId: number;
        userId?: string;
    }) {
        return this.db.auditableEntity.create({
            data: {
                resource_type: resourceType,
                resource_id: resourceId,
                action,
                changes,
                tenant_id: tenantId,
                created_by: userId,
                updated_by: userId,
            },
        });
    }

    async getAuditLogs({
        resourceType,
        resourceId,
        tenantId,
        startDate,
        endDate,
    }: {
        resourceType?: ResourceType;
        resourceId?: string;
        tenantId: number;
        startDate?: Date;
        endDate?: Date;
    }) {
        const where: any = { tenant_id: tenantId };

        if (resourceType) where.resource_type = resourceType;
        if (resourceId) where.resource_id = resourceId;
        if (startDate || endDate) {
            where.created_at = {};
            if (startDate) where.created_at.gte = startDate;
            if (endDate) where.created_at.lte = endDate;
        }

        return this.db.auditableEntity.findMany({
            where,
            orderBy: { created_at: 'desc' },
        });
    }
}
