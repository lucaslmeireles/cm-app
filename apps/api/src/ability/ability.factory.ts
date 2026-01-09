import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import {
  Department,
  Employee,
  Metric,
  Grade,
  User,
  Organization,
  Evaluation,
  Education,
  Absence,
  CareerPath,
  CareerStep,
  Position,
  Salary,
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
  Organization: Organization;
  Education: Education;
  Absence: Absence;
  CareerPath: CareerPath;
  CareerStep: CareerStep;
  Position: Position;
  Salary: Salary;
  AuditableEntity: AuditableEntity;
  Evaluation: Evaluation;
};

type UserAbility = {
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
  defineAbility(user: UserAbility) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);
    if (user?.role.toUpperCase() === 'SUPERVISOR') {
      builder.cannot(
        [Action.Create, Action.Delete, Action.Update],
        'Organization',
      );
      builder.cannot([Action.Create, Action.Delete, Action.Update], 'Employee');
      builder.cannot([Action.Create, Action.Delete], 'User');
      builder.cannot([Action.Create, Action.Delete, Action.Update], 'Position');
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
      builder.can([Action.Create, Action.Read, Action.Update], 'Education', {
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

      builder.can(Action.Manage, 'Evaluation', {
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

      builder.can([Action.Read, Action.Create, Action.Update], 'Absence', {
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
        users: {
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
      builder.cannot([Action.Create, Action.Delete, Action.Update], 'Employee');
      builder.cannot([Action.Create, Action.Delete], 'User');
      builder.cannot([Action.Create, Action.Delete, Action.Update], 'Position');

      builder.can([Action.Create, Action.Update, Action.Read], 'CareerPath');
      builder.can(Action.Manage, 'CareerStep');
      builder.can([Action.Read, Action.Update], 'Department', {
        org: {
          id: {
            equals: user.tenant_id,
          },
        },
      });
      builder.can(Action.Manage, 'Education', {
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
      builder.can(Action.Read, 'Metric', {
        org: {
          id: {
            equals: user.tenant_id,
          },
        },
      });

      builder.can(Action.Read, 'Organization', {
        users: {
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
      builder.can(Action.Read, ['Assessment', 'Grade']);
      builder.can(Action.Manage, [
        'Absence',
        'CareerPath',
        'CareerStep',
        'Education',
        'Metric',
        'Position',
        'Salary',
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
      builder.can(Action.Manage, ['AuditableEntity']);
    }
    const ability = builder.build();
    return ability;
  }
}
