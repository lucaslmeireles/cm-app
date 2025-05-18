import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { RequiredRule } from './ability.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilityGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // If the route is public, allow access
        if (this.reflector.get<boolean>('isPublic', context.getHandler())) {
            return true;
        }
        const rules =
            this.reflector.get<RequiredRule[]>(
                'check_ability',
                context.getHandler(),
            ) || [];
        const req = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactory.defineAbility(req.user);
        try {
            rules.forEach((rule) => {
                console.log(
                    ForbiddenError.from(ability).throwUnlessCan(
                        rule.action,
                        rule.subject,
                    ),
                );

                ForbiddenError.from(ability).throwUnlessCan(
                    rule.action,
                    rule.subject,
                );
            });
            return true;
        } catch (e) {
            if (e instanceof ForbiddenError) {
                throw new ForbiddenException(e.message);
            }
        }
        return true;
    }
}
