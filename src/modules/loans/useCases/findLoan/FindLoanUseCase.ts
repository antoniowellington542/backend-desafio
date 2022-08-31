import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Loan } from '../../infra/entities/Loan';
import { ILoansRepository } from '../../repositories/ILoansRepository';
import { IParcelsRepository } from '../../repositories/IParcelsRepository';

@injectable()
export class FindLoanUseCase {
  constructor(
    @inject('LoansRepository')
    private loansRepository: ILoansRepository,
    @inject('ParcelsRepository')
    private parcelsRepository: IParcelsRepository
  ) {}

  async execute(user_id: string): Promise<Loan> {
    const loan = await this.loansRepository.find(user_id);
    if (!loan) {
      throw new AppError('Loan not found!');
    }

    const parcels = await this.parcelsRepository.find(loan.id);
    loan.parcels = parcels;

    return loan;
  }
}
