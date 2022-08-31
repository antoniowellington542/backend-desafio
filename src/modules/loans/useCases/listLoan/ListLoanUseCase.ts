import { inject, injectable } from 'tsyringe';

import { Loan } from '../../infra/entities/Loan';
import { ILoansRepository } from '../../repositories/ILoansRepository';

@injectable()
export class ListLoanUseCase {
  constructor(
    @inject('LoansRepository')
    private loansRepository: ILoansRepository
  ) {}

  async execute(): Promise<Loan[]> {
    const loan = await this.loansRepository.list();
    return loan;
  }
}
