import { Test, TestingModule } from '@nestjs/testing';
import { AbsenceService } from './absence.service';
import { DbService } from 'src/db/db.service';
import { AbilityFactory } from 'src/ability/ability.factory';
import { HttpStatus, ForbiddenException } from '@nestjs/common';

describe('AbsencesService', () => {
  let service: AbsenceService;

  const mockAbsence = {
    id: 'abs1',
    approver_id: 'app1',
    employee_id: 'emp1',
    start_date: new Date('2025-01-01'),
    end_date: new Date('2025-01-02'),
    status: 'PENDING',
    type: 'VACATION',
  } as any;

  beforeEach(async () => {
    // create fresh mocks for each test
    let db = {
      absence: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      }
    }

    let ac = {
      // defineAbility should return a function (ability builder) used by accessibleBy in the service
      defineAbility: jest.fn().mockReturnValue((/* user */) => ({})),
    } as Partial<AbilityFactory>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AbsenceService,
        { provide: DbService, useValue: db },
        { provide: AbilityFactory, useValue: ac },
      ],
    }).compile();

    service = module.get<AbsenceService>(AbsenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates an absence and returns CREATED response', async () => {
      (db!.absence!.create as jest.Mock).mockResolvedValue(mockAbsence);

      const dto: any = {
        start_date: new Date('2025-01-01'),
        end_date: new Date('2025-01-02'),
        type: 'VACATION',
        justification: 'reason',
        document: [],
        status: 'PENDING',
        approver_id: 'app1',
        employee_id: 'emp1',
      };

      const res = await service.create(dto);

      expect(res.statusCode).toBe(HttpStatus.CREATED);
      expect((db!.absence!.create as jest.Mock).mock.calls.length).toBe(1);
      expect((db!.absence!.create as jest.Mock).mock.calls[0][0]).toHaveProperty('data');
    });

    it('rethrows create errors as Error', async () => {
      (db!.absence!.create as jest.Mock).mockRejectedValue(new Error('db fail'));

      await expect(service.create({} as any)).rejects.toThrow('db fail');
    });
  });

  describe('findAll', () => {
    it('returns list of absences', async () => {
      (db!.absence!.findMany as jest.Mock).mockResolvedValue([mockAbsence]);

      const res = await service.findAll({ id: 'user' } as any);

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.data).toHaveLength(1);
    });

    it('throws ForbiddenException when no data found', async () => {
      (db!.absence!.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.findAll({ id: 'user' } as any)).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('findOne', () => {
    it('returns an absence when found', async () => {
      (db!.absence!.findFirst as jest.Mock).mockResolvedValue(mockAbsence);

      const res = await service.findOne('abs1', { id: 'user' } as any);

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.data).toEqual(mockAbsence);
    });

    it('throws ForbiddenException when not found', async () => {
      (db!.absence!.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne('abs1', { id: 'user' } as any)).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe('update', () => {
    it('updates an absence and returns Updated', async () => {
      (db!.absence!.update as jest.Mock).mockResolvedValue(mockAbsence);

      const res = await service.update('abs1', { start_date: new Date() } as any, { id: 'user' } as any);

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.message).toBe('Updated');
    });

    it('throws Error when update returns empty', async () => {
      (db!.absence!.update as jest.Mock).mockResolvedValue(null);

      await expect(service.update('abs1', {} as any, { id: 'user' } as any)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('deletes an absence and returns Deleted', async () => {
      (db!.absence!.delete as jest.Mock).mockResolvedValue(mockAbsence);

      const res = await service.remove('abs1', { id: 'user' } as any);

      expect(res.statusCode).toBe(HttpStatus.OK);
      expect(res.message).toBe('Deleted');
    });

    it('throws ForbiddenException when delete not found', async () => {
      (db!.absence!.delete as jest.Mock).mockResolvedValue(null);

      await expect(service.remove('abs1', { id: 'user' } as any)).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
