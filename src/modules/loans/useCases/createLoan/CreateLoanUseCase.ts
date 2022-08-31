import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Parcel } from '../../infra/entities/Parcel';
import { ILoansRepository } from '../../repositories/ILoansRepository';
import { IParcelsRepository } from '../../repositories/IParcelsRepository';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  cpf: string;
  birthday: string;
  uf: string;
  value: number;
  tax: number;
  parcelValue: number;
  qntParcels: number;
  totalTax: number;
  totalPayValue: number;
  parcels: Parcel[];
}

@injectable()
export class CreateLoanUseCase {
  constructor(
    @inject('LoansRepository')
    private loansRepository: ILoansRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ParcelsRepository')
    private parcelsRepository: IParcelsRepository
  ) {}

  async execute({
    uf,
    cpf,
    parcelValue,
    value,
    tax,
    totalPayValue,
    totalTax,
    parcels,
    qntParcels,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.find(cpf);
    if (!user) {
      throw new AppError('User not found!');
    }

    const loan = await this.loansRepository.find(user.id);

    if (loan) {
      throw new AppError('Loan already exists!');
    }

    await this.loansRepository.create({
      uf,
      parcelValue,
      value,
      user_id: user.id,
      tax,
      parcels,
      totalPayValue,
      totalTax,
      qntParcels,
    });

    const loanExists = await this.loansRepository.find(user.id);

    parcels.map(async (parcel) => {
      await this.parcelsRepository.create({
        parcelValue: parcel.parcelValue,
        feesValue: parcel.feesValue,
        payDate: parcel.payDate,
        payValue: parcel.payValue,
        valueWithFees: parcel.valueWithFees,
        loan_id: loanExists.id,
      });
    });

    // console.log(parcels);

    const parcels_list = await this.parcelsRepository.find(loanExists.id);
    // loanExists.parcels = parcels_list;
    // console.log(loanExists.parcels);
    await this.loansRepository.create({
      ...loanExists,
      parcels: parcels_list,
    });
  }
}
