import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { StateService } from '../state.service';
import { StateEntity } from '../entities/state.entity';
import { stateEntityMock } from '../__mock__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let userRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    userRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getAllStates', () => {
    it('should return all states', async () => {
      const states = await service.getAllStates();
      expect(states).toEqual([stateEntityMock]);
    });

    it('should return error if repo throws', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());
      expect(service.getAllStates()).rejects.toThrow();
    });
  });
});
