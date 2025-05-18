import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import {
    Department,
    Employee,
    Job,
    Metric,
    Grade,
    User,
    Organization,
    Assessment,
    Formation,
    DISC,
    Absence,
    CareerPath,
    CareerStep,
    Position,
    Salary,
    DataConsent,
    AuditableEntity,
} from '@prisma/client';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
export type Subject = {
    User: User;
    Department: Department;
    Employee: Employee;
    Metric: Metric;
    Grade: Grade;
    Job: Job;
    Organization: Organization;
    Assessment: Assessment;
    Formation: Formation;
    DISC: DISC;
    Absence: Absence;
    CareerPath: CareerPath;
    CareerStep: CareerStep;
    Position: Position;
    Salary: Salary;
    DataConsent: DataConsent;
    AuditableEntity: AuditableEntity;
};

type UserAb = {
    role: string;
    user: string;
    tenant_id: number;
};
type AppAbility = PureAbility<[Action, Subjects<Subject> | 'all'], PrismaQuery>;

//TODO Fiz mudanças sobre o estado ativo do usuario
//TODO Apenas os usuarios de RH podem fazer qualquer modificação na plataforma, inclusive criar funcionarios
//Todos os outros podem apenas ver e adicionar notas
@Injectable()
export class AbilityFactory {
    defineAbility(user: UserAb) {
        const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
        if (user?.role.toUpperCase() === 'SUPERVISOR') {
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Organization',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Employee',
            );
            builder.cannot([Action.Create, Action.Delete], 'User');
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Job',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Position',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'CareerPath',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'CareerStep',
            );
            // User can only read their own data and some parts of the employee data
            builder.can([Action.Read, Action.Update], 'User', {
                id: user.user,
                active: true,
            });
            builder.can(Action.Read, 'Organization', {
                id: {
                    equals: user.tenant_id,
                },
            });
            builder.can(
                Action.Read,
                'Employee',
                [
                    'name',
                    'profile_pic',
                    'entry_date',
                    'current_position_id',
                    'email_encrypted',
                    'register',
                    'score',
                    'manager_id',
                ],
                {
                    tenant_id: { equals: user.tenant_id },
                    AND: [
                        {
                            manager: {
                                user: {
                                    id: {
                                        equals: user.user,
                                    },
                                },
                            },
                        },
                    ],

                    // apenas os gerentes podem ver todos e os supervisores so quem eles adiministram
                },
            );
            builder.can(
                [Action.Create, Action.Read, Action.Update],
                'Formation',
                {
                    employee: {
                        manager: {
                            user: {
                                id: {
                                    equals: user.user,
                                },
                            },
                        },
                    },
                },
            );

            builder.can(Action.Manage, 'Assessment', {
                employee: {
                    manager: {
                        user: {
                            id: {
                                equals: user.user,
                            },
                        },
                    },
                },
            });
            builder.can(Action.Manage, 'DISC', {
                employee: {
                    manager: {
                        user: {
                            id: {
                                equals: user.user,
                            },
                        },
                    },
                },
            });
            builder.can(
                [Action.Read, Action.Create, Action.Update],
                'Absence',
                {
                    employee: {
                        manager: {
                            user: {
                                id: {
                                    equals: user.user,
                                },
                            },
                        },
                    },
                },
            );

            builder.can([Action.Read], 'Job', {
                org: {
                    id: {
                        equals: user.tenant_id,
                    },
                },
            });
            builder.can(Action.Manage, 'Grade', {
                employee: {
                    org: {
                        id: {
                            equals: user.tenant_id,
                        },
                    },
                },
            });
            builder.can(Action.Read, 'Organization', {
                members: {
                    some: {
                        id: {
                            equals: user.user,
                        },
                    },
                },
            });
            //TODO Apenas user daquele departamento podem ver, pensar nisso
            builder.can(Action.Read, 'Department', {
                tenant_id: {
                    equals: user.tenant_id,
                },
            });

            builder.can(Action.Read, 'Metric', {
                tenant_id: {
                    equals: user.tenant_id,
                },
            });
            builder.can(Action.Create, 'AuditableEntity');
        }
        if (user?.role.toUpperCase() === 'GERENTE') {
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Organization',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Employee',
            );
            builder.cannot([Action.Create, Action.Delete], 'User');
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Job',
            );
            builder.cannot(
                [Action.Create, Action.Delete, Action.Update],
                'Position',
            );

            builder.can(
                [Action.Create, Action.Update, Action.Read],
                'CareerPath',
            );
            builder.can(Action.Manage, 'CareerStep');
            builder.can([Action.Read, Action.Update], 'Department', {
                org: {
                    id: {
                        equals: user.tenant_id,
                    },
                },
            });
            builder.can(Action.Manage, 'Formation', {
                employee: {
                    org: {
                        id: {
                            equals: user.tenant_id,
                        },
                    },
                },
            });
            builder.can(Action.Manage, 'Assessment', {
                employee: {
                    org: {
                        id: user.tenant_id,
                    },
                },
            });
            builder.can(Action.Manage, 'DISC', {
                employee: {
                    org: {
                        id: user.tenant_id,
                    },
                },
            });
            //TODO Quando for um gerente atualizando o id dele passa a ser o aprovador
            builder.can(Action.Manage, 'Absence', {
                employee: {
                    org: {
                        id: user.tenant_id,
                    },
                },
            });
            builder.can(Action.Read, 'Employee', {
                org: {
                    id: {
                        equals: user.tenant_id,
                    },
                },
            });
            builder.can(Action.Manage, 'Grade', {
                employee: {
                    org: {
                        id: {
                            equals: user.tenant_id,
                        },
                    },
                },
            });
            builder.can(Action.Manage, 'Job', {
                tenant_id: {
                    equals: user.tenant_id,
                },
            });
            builder.can(Action.Manage, 'Metric', {
                department: {
                    every: {
                        org: {
                            id: {
                                equals: user.tenant_id,
                            },
                        },
                    },
                },
            });

            builder.can(Action.Read, 'Organization', {
                members: {
                    some: {
                        id: {
                            equals: user.user,
                        },
                    },
                },
            });
            builder.can([Action.Read, Action.Update], 'User', {
                tenant_id: {
                    equals: user.tenant_id,
                },
            });
            builder.can(Action.Create, 'AuditableEntity');
        }
        if (user?.role.toUpperCase() === 'RH') {
            builder.can(Action.Create, 'AuditableEntity');
            builder.can(Action.Read, ['Assessment', 'DISC', 'Grade']);
            builder.can(Action.Manage, [
                'Absence',
                'CareerPath',
                'CareerStep',
                'Formation',
                'Job',
                'Metric',
                'Position',
                'Salary',
                'DataConsent',
                'User',
                'Employee',
                'Department',
            ]);
        }
        if (user?.role.toUpperCase() == 'SUPERUSER') {
            builder.can(Action.Manage, 'all');
        }
        if (user?.role.toUpperCase() === 'TI') {
            builder.can(Action.Manage, 'User');
            builder.can(Action.Manage, 'Organization');
            builder.can(Action.Manage, ['AuditableEntity', 'DataConsent']);
        }
        const ability = builder.build();
        return ability;
    }
}
