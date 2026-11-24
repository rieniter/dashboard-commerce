import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service.js';
import { DRIZZLE } from '../../database/database.provider.js';

describe('UsersService', () => {
  let service: UsersService;
  const mockDb = {
    select: vi.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: DRIZZLE,
        useValue: mockDb,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
