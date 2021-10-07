import 'reflect-metadata';
import AppError from '../../errors/AppError';
import FakeTokenProvider from '../../infra/fakes/FakeTokenProvider';
import ValidateTokenService from './ValidateTokenService';

let validateTokenService: ValidateTokenService;

describe('ValidateTokenService', () => {
  beforeEach(async () => {
    validateTokenService = new ValidateTokenService(new FakeTokenProvider());
  });

  it('should return error if token is invalid', async () => {
    expect(
      await validateTokenService.execute({
        authorization: 'invalid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return error if token not found', () => {
    expect(validateTokenService.execute({})).rejects.toBeInstanceOf(AppError);
  });

  it('should return true if token is valid', () => {
    expect(
      validateTokenService.execute({
        authorization: 'OPA 850faad8955c4afa3983ad9cff370117',
      }),
    ).toBe(true);
  });
});
