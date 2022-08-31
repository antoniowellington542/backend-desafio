import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Loan } from '../../infra/entities/Loan';
import { FindLoanUseCase } from './FindLoanUseCase';

export class FindLoanController {
  async handle(request: Request, response: Response): Promise<Response<Loan>> {
    const { user_id } = request.params;

    const findLoanUseCase = container.resolve(FindLoanUseCase);

    try {
      const loan = await findLoanUseCase.execute(user_id);
      return response.status(200).json(loan);
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
