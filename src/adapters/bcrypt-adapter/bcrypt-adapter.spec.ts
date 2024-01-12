import * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';
import { configService } from '../../config/config.service';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },

  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = configService.getBcryptConfig().saltOrRounds;

describe('Bcrypt Adapter', () => {
  let sut: BcryptAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptAdapter],
    }).compile();

    sut = module.get<BcryptAdapter>(BcryptAdapter);
  });

  it('Should call hash with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');

    await sut.hash('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a valid hash on hash success', async () => {
    const hash = await sut.hash('any_value');

    expect(hash).toBe('hash');
  });

  it('Should throw if hash throws', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.hash('any_value');

    expect(promise).rejects.toThrow();
  });

  it('Should call compare with correct values', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare');

    await sut.compare('any_value', 'any_hash');

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  it('Should return true when compare succeeds', async () => {
    const isValid = await sut.compare('any_value', 'any_hash');

    expect(isValid).toBe(true);
  });

  it('Should return false when compare fails', async () => {
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementationOnce(async (): Promise<boolean> => {
        return new Promise((resolve) => resolve(false));
      });
    const isValid = await sut.compare('any_value', 'any_hash');

    expect(isValid).toBe(false);
  });

  it('Should throw if compare throws', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.compare('any_value', 'any_hash');

    expect(promise).rejects.toThrow();
  });
});
