import { Repository } from 'typeorm';

import AppDataSource from '../../../../shared/infra/typeorm';
import { ICreateParcelsDTO } from '../../dtos/ICreateParcelsDTO';
import { Parcel } from '../../infra/entities/Parcel';
import { IParcelsRepository } from '../IParcelsRepository';

export class ParcelRepository implements IParcelsRepository {
  private repository: Repository<Parcel>;
  constructor() {
    this.repository = AppDataSource.getRepository(Parcel);
  }
  async create({
    parcelValue,
    payDate,
    payValue,
    feesValue,
    valueWithFees,
    loan_id,
  }: ICreateParcelsDTO): Promise<void> {
    const parcel = this.repository.create({
      parcelValue,
      payDate,
      payValue,
      feesValue,
      valueWithFees,
      loan_id,
    });

    await this.repository.save(parcel);
  }
  async find(loan_id: string): Promise<Parcel[]> {
    const parcel = await this.repository.find({ where: { loan_id } });
    return parcel;
  }
}
