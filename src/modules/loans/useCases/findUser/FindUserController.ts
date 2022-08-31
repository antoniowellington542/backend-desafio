import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../infra/entities/User';
import { FindUserUseCase } from './FindUserUseCase';

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response<User>> {
    const { cpf } = request.params;

    const findUserUseCase = container.resolve(FindUserUseCase);

    try {
      const user = await findUserUseCase.execute(cpf);
      return response.status(200).json(user);
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
