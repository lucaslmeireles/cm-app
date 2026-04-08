import { PrismaClient, User } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import prisma from '../src/db';

jest.mock('../src/db', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

export const userMock = {
  id: 'abcde-4567-8901',
  email: 'teste@teste.com',
  active: false,
  tenant_id: 1,
  role_id: 'riewj9-3508uf-3kjf8u',
  tokenInvite: 'fw8werhw0-we90w3u-e9wufiej',
  password: '123456',
  keycloakId: 'qoihiuh9dsf-0isij8du0',
} as User;
