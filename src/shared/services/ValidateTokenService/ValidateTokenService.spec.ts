import 'reflect-metadata';
import AppError from '../../errors/AppError';
import FakeTokenProvider from '../../infra/fakes/FakeTokenProvider';
import ValidateTokenService from './ValidateTokenService';

let validateTokenService: ValidateTokenService;

describe('ValidateTokenService', () => {
  beforeEach(async () => {
    validateTokenService = new ValidateTokenService(new FakeTokenProvider());
  });

  it('should return error if token is invalid', () => {
    const executeFunction = () => {
      validateTokenService.execute({
        authorization: 'invalid',
      });
    };

    expect(executeFunction).toThrow(AppError);
  });

  it('should return error if token not found', () => {
    const executeFunction = () => {
      validateTokenService.execute({});
    };

    expect(executeFunction).toThrow(AppError);
  });

  it('should return true if token is valid', () => {
    expect(
      validateTokenService.execute({
        authorization: 'OPA 850faad8955c4afa3983ad9cff370117',
      }),
    ).toBe(true);
  });
});
