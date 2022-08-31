import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { Loan } from '../../infra/entities/Loan';
import { ListLoanUseCase } from './ListLoanUseCase';

export class ListLoanController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Loan[]>> {
    const listLoanUseCase = container.resolve(ListLoanUseCase);
    const loans = await listLoanUseCase.execute();
    return response.status(200).json(loans);
  }
}
