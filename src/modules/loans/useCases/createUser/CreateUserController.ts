import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, birthday } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({ cpf, birthday });
      return response.status(201).json({
        message: 'Usuario criado',
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
