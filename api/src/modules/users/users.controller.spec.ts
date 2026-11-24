import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { DRIZZLE } from '../../database/database.provider.js';

describe('UsersController', () => {
  let controller: UsersController;
    const mockDb = {
    select: vi.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,{
        provide: DRIZZLE,
        useValue: mockDb
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
