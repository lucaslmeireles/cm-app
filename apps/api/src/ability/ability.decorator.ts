import { SetMetadata } from '@nestjs/common';
import { Action, Subject } from './ability.factory';
import { Subjects } from '@casl/prisma';

export interface RequiredRule {
    action: Action;
    subject: Subjects<Subject>;
    condition?: string;
}

export const CheckAbilities = (...requirements: RequiredRule[]) =>
    SetMetadata('check_ability', requirements);
