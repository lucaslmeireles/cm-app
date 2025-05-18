import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { EditUser } from './dto/edituser.dto';
import * as bcrypt from 'bcrypt';
import { AbilityFactory } from 'src/ability/ability.factory';
import { ReqUser } from 'src/types/requser.type';
import { Prisma, User } from '@prisma/client';
import { accessibleBy } from '@casl/prisma';

import { ifEmpty } from 'src/helpers/ifempty';
import { ResponseType } from 'src/types/response.type';
import { CreateUser } from './dto/createuser.dto';

type UserById = {
  email: string;
  active: boolean;
  employee: {
    birthday: Date;
    department: { name: string }[];
    name: string;
    profile_pic: string;
  };
  tenant_id: number;
  role: {
    name: string;
  };
};

type UserLogin = User & {
  employee?: {
    id: string;
    name: string;
    profile_pic: string;
  };
  org: {
    id: number;
  };
  role: {
    name: string;
    id: string;
  };
};
type UserSanitezed = {
  email: string;
  id: string;
};

@Injectable()
export class UserService {
  constructor(
    private db: DbService,
    private ac: AbilityFactory,
  ) {}
  ability = this.ac.defineAbility;
  saltRounds = 10;

  /**
   *  This function finds a user by the email, here its named username, is used in the LocalStrategy validate function
   *  @param username
   *  @returns User
   */
  //TODO If the user is not found, return null
  async findUser(username: string): Promise<ResponseType<UserLogin>> {
    try {
      const user = await this.db.user.findUniqueOrThrow({
        where: {
          email: username,
        },
        select: {
          id: true,
          email: true,
          password: true,
          tenant_id: true,
          role_id: true,
          active: true,
          created_at: true,
          updated_at: true,
          deleted_at: true,
          employee_id: true,
          org: {
            select: {
              id: true,
            },
          },
          role: {
            select: {
              name: true,
              id: true,
            },
          },
          employee: {
            select: {
              id: true,
              name: true,
              profile_pic: true,
            },
          },
        },
      });
      return {
        statusCode: 200,
        message: 'User retrieved successfully.',
        data: user,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Database error.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (e instanceof NotFoundException) {
        throw e;
      }
    }
  }

  //TODO CRIAR LOG
  async listAllUsers(user: ReqUser): Promise<ResponseType<UserSanitezed[]>> {
    try {
      const users = await this.db.user.findMany({
        where: accessibleBy(this.ability(user)).User,
        select: {
          email: true,
          id: true,
        },
      });
      ifEmpty(users);
      return {
        statusCode: 200,
        message: 'Users retrieved successfully.',
        data: users,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Database error.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new ForbiddenException(
        'You do not have permission to access this data.',
      );
    }
  }

  /**
   *  This function finds a user by id, is used in the main webapp to show user details
   *  @param username
   *  @returns User
   */

  async getUserById(
    id: string,
    userid: ReqUser,
  ): Promise<ResponseType<UserById>> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id,
          AND: [accessibleBy(this.ability(userid)).User],
        },
        select: {
          active: true,
          email: true,
          employee: {
            select: {
              birthday: true,
              department: {
                select: {
                  name: true,
                },
              },
              name: true,
              profile_pic: true,
            },
          },
          tenant_id: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      });
      ifEmpty(user);
      console.log(user);
      return {
        statusCode: 200,
        message: 'Users retrieved successfully.',
        data: user,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Database error.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new ForbiddenException(
        'You do not have permission to access this data.',
      );
    }
  }

  async editUserById(
    id: string,
    dto: EditUser,
    user: ReqUser,
  ): Promise<ResponseType<User>> {
    console.log(dto);
    try {
      const crr_user = await this.db.user.findUnique({
        where: {
          id,
        },
      });
      ifEmpty(crr_user);
      let hash;
      if (dto.password) {
        hash = await bcrypt.hash(dto.password, 10);
      } else {
        hash = crr_user.password;
      }
      const userEdit = await this.db.user.update({
        where: {
          id: id,
          AND: [accessibleBy(this.ability(user)).User],
        },
        data: {
          email: dto.email,
          password: hash,
          ...(dto.tenant_id && {
            org: {
              connect: {
                id: dto.tenant_id,
              },
            },
          }),
          ...(dto.role && {
            role: {
              connect: {
                id: dto.role,
              },
            },
          }),
          ...(dto.employee_id && {
            employee: {
              connect: {
                id: dto.employee_id,
              },
            },
          }),
        },
      });
      ifEmpty(userEdit);
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: userEdit,
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
        throw new HttpException(
          'Database error.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new ForbiddenException(
        'You do not have permission to access this data.',
      );
    }
  }

  async findSuperUser(): Promise<ResponseType<boolean>> {
    const superUser = await this.db.user.findFirst({
      where: {
        role: {
          name: {
            equals: 'SuperUser',
          },
        },
      },
    });
    return {
      statusCode: 200,
      message: 'SuperUser found',
      data: superUser ? true : false,
    };
  }

  async createUser(
    user: ReqUser,
    dto: CreateUser,
  ): Promise<ResponseType<string>> {
    //TODO Melhorar Type
    try {
      const hash = await bcrypt.hash(dto.password, this.saltRounds);
      await this.db.user.create({
        data: {
          email: dto.email,
          password: hash,
          org: {
            connect: {
              id: dto.tenant_id,
            },
          },
          role: {
            connect: {
              id: dto.role,
            },
          },
          active: false,
          ...(dto.employee_id && {
            employee: {
              connect: {
                id: dto.employee_id,
              },
            },
          }),
        },
      });
      return {
        statusCode: 201,
        message: 'User created',
      };
    } catch (e) {
      console.log(e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code == 'P2002'
      ) {
        throw new HttpException('User already exsist', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async deleteUser(id: string, user: ReqUser): Promise<ResponseType<string>> {
    try {
      const userDelete = await this.db.user.delete({
        where: {
          id,
          AND: [accessibleBy(this.ability(user)).User],
        },
      });
      ifEmpty(userDelete);
      return {
        statusCode: 200,
        message: 'User deleted',
        data: userDelete.id,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  @HttpCode(200)
  async changePassword(
    dto: EditUser,
    user: ReqUser,
  ): Promise<ResponseType<string>> {
    const hash = await bcrypt.hash(dto.password, this.saltRounds);
    try {
      const userChange = await this.db.user.update({
        where: {
          id: user.user,
        },
        data: {
          password: hash,
          active: true,
        },
      });
      ifEmpty(userChange);
      return {
        statusCode: 200,
        message: 'Password changed',
        data: userChange.id,
      };
    } catch (e) {
      console.log(e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code == 'P2025'
      ) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    }
  }

  async reset_password(
    dto: EditUser,
    userreq: ReqUser,
  ): Promise<ResponseType<User>> {
    try {
      const hash = await bcrypt.hash(dto.password, this.saltRounds);
      const user = await this.db.user.update({
        where: {
          id: dto.id,
          AND: [accessibleBy(this.ability(userreq)).User],
        },
        data: {
          password: hash,
          active: false,
        },
      });
      delete user.password;
      return {
        statusCode: 200,
        message: 'Password reset complete',
        data: user,
      };
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  async getPermissions(user: ReqUser): Promise<ResponseType<string[]>> {
    try {
      const isAdmin = await this.db.user.findFirst({
        select: {
          role: {
            select: {
              name: true,
            },
          },
        },
        where: {
          id: user.user,
        },
      });
      if (!isAdmin) {
        throw new ForbiddenException('User not found');
      }
      switch (isAdmin.role.name) {
        case 'SuperUser':
          const permissions = ['admin'];
          return {
            statusCode: 200,
            message: 'Permissions retrieved',
            data: permissions,
          };
        case 'RH':
          const permissionsRH = ['rh'];
          return {
            statusCode: 200,
            message: 'Permissions retrieved',
            data: permissionsRH,
          };
        case 'Gerente':
          const permissionsGerente = ['gerente'];
          return {
            statusCode: 200,
            message: 'Permissions retrieved',
            data: permissionsGerente,
          };
      }
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
