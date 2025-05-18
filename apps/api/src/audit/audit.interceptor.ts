import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from './audit.service';
import { Reflector } from '@nestjs/core';
import { ResourceType } from '@prisma/client';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
    constructor(
        private auditService: AuditService,
        private reflector: Reflector,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const resourceType = this.reflector.get<string>(
            'resourceType',
            context.getHandler(),
        );

        if (!resourceType) {
            console.log('Interceptor ignorado: resourceType não encontrado');
            return next.handle();
        }

        return next.handle().pipe(
            tap(async (data) => {
                const userId = request.user?.id;
                const tenantId = request.user?.tenant_id;
                const method = request.method;

                let action: 'CREATE' | 'UPDATE' | 'DELETE';
                switch (method) {
                    case 'POST':
                        action = 'CREATE';
                        break;
                    case 'PUT':
                    case 'PATCH':
                        action = 'UPDATE';
                        break;
                    case 'DELETE':
                        action = 'DELETE';
                        break;
                    default:
                        return;
                }

                await this.auditService.createAuditLog({
                    resourceType: resourceType as ResourceType,
                    resourceId: data.id,
                    action,
                    changes: method !== 'DELETE' ? data : undefined,
                    tenantId,
                    userId,
                });
            }),
        );
    }
}
