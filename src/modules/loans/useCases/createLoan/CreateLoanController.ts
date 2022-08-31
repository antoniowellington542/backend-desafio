import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { CreateLoanUseCase } from './CreateLoanUseCase';

export class CreateLoanController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      birthday,
      uf,
      cpf,
      parcelValue,
      value,
      tax,
      totalPayValue,
      totalTax,
      parcels,
      qntParcels,
    } = request.body;

    const createLoanUseCase = container.resolve(CreateLoanUseCase);

    try {
      await createLoanUseCase.execute({
        birthday,
        uf,
        cpf,
        parcelValue,
        value,
        tax,
        totalPayValue,
        totalTax,
        parcels,
        qntParcels,
      });

      return response.status(201).json({
        message: 'Empréstimo Criado',
      });
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
