/* eslint-disable no-nested-ternary */
import dayjs from 'dayjs';
import { Repository } from 'typeorm';

import AppDataSource from '../../../../shared/infra/typeorm/index';
import { ICreateLoanDTO } from '../../dtos/ICreateLoanDTO';
import { ICreateParcelsDTO } from '../../dtos/ICreateParcelsDTO';
import { Loan } from '../../infra/entities/Loan';
import { ILoansRepository } from '../ILoansRepository';

export class LoansRepository implements ILoansRepository {
  private repository: Repository<Loan>;

  constructor() {
    this.repository = AppDataSource.getRepository(Loan);
  }
  async list(): Promise<Loan[]> {
    const loans = await this.repository.find();
    return loans;
  }

  calcFees(city: string): number {
    const tax =
      city === 'MG'
        ? 0.01
        : city === 'SP'
        ? 0.008
        : city === 'RJ'
        ? 0.009
        : 0.0111;
    return tax;
  }

  projectionParcels(
    value: number,
    tax: number,
    parcelValue: number
  ): ICreateParcelsDTO[] {
    let requiredValue = value;

    const parcels: Array<ICreateParcelsDTO> = [];
    let month = 0;
    while (requiredValue > 0) {
      const feesValue = parseFloat((requiredValue * tax).toFixed(2));
      const valueWithFees = feesValue + requiredValue;
      month += 1;
      const payDay = dayjs().add(month, 'M');
      const p: ICreateParcelsDTO = {
        payValue: requiredValue,
        feesValue,
        valueWithFees,
        parcelValue,
        payDate: payDay.toString(),
      };
      requiredValue = requiredValue + feesValue - parcelValue;
      parcels.push(p);
    }

    return parcels;
  }
  totalTaxValue(parcels: ICreateParcelsDTO[]): number {
    const total = parcels.reduce((total, item) => total + item.feesValue, 0);
    return total;
  }

  async find(user_id: string): Promise<Loan> {
    const loan = await this.repository.findOne({ where: { user_id } });
    return loan;
  }

  async create({
    parcelValue,
    value,
    uf,
    user_id,
    id,
    qntParcels,
    tax,
    totalPayValue,
    totalTax,
    parcels,
  }: ICreateLoanDTO): Promise<void> {
    const loan = this.repository.create({
      id,
      parcelValue,
      value,
      uf,
      user_id,
      qntParcels,
      tax,
      totalPayValue,
      totalTax,
      parcels,
    });
    await this.repository.save(loan);
  }
}
