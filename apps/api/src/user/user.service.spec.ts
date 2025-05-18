import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DbService } from '../db/db.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, DbService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<DbService>(DbService);
  });

  describe('listAllUsers', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        {
          id: 'abcde-4567-8901',
          email: 'teste@teste.com',
          active: false,
          tenant_id: 1,
          role_id: 'riewj9-3508uf-3kjf8u',
          tokenInvite: 'fw8werhw0-we90w3u-e9wufiej',
          password: '123456',
          keycloakId: 'qoihiuh9dsf-0isij8du0',
        },
        {
          id: 'abcde-34253-8901',
          email: 'teste@324342.com',
          active: true,
          tenant_id: 1,
          role_id: 'riewj9-3508uf-3kjf8u',
          tokenInvite: 'fsggw532-we90w3u-e9wufiej',
          password: '123456',
          keycloakId: 'fsadsgage4-0isij8du0',
        },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);

      const result = await service.listAllUsers({
        user: '1',
        role: 'GERENTE',
        tenant_id: 1,
        email: 'test@email.com',
      });
      expect(result).toEqual(mockUsers);
    });
  });
});
