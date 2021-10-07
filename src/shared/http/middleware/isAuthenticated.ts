import { NextFunction, Request, Response } from 'express';
import ValidateTokenService from '../../services/ValidateTokenService/ValidateTokenService';
import { container } from 'tsyringe';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const validateTokenService = container.resolve(ValidateTokenService);

  const authorization = request.headers.authorization;

  validateTokenService.execute({
    authorization,
  });

  return next();
}
